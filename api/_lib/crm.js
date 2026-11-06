import { check } from "./validate.js";

// Login / Sign up are handled by your CRM; we only relay the request.
export async function viaCrm(url, signup, b, res) {
  if (!url) return res.status(503).json({ message: "Account system is not connected yet." });
  const { name, email, password, ref } = b;
  if (check.email(email)) return res.status(400).json({ message: "Enter a valid email address." });
  if (String(password || "").length < 8) return res.status(400).json({ message: "Password must be at least 8 characters." });
  if (signup && !String(name || "").trim()) return res.status(400).json({ message: "Enter your full name." });
  const { CRM_API_KEY } = process.env;
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(CRM_API_KEY && { Authorization: `Bearer ${CRM_API_KEY}` }) },
    body: JSON.stringify(signup ? { name, email, password, ref } : { email, password }),
    signal: AbortSignal.timeout(15000),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) return res.status(r.status).json({ message: j.message || j.error || "Request failed." });
  res.json({
    token: j.token || j.accessToken || j.data?.token,
    user: j.user || j.data?.user || { name: name || email.split("@")[0], email },
    redirect: j.redirect,
  });
}
