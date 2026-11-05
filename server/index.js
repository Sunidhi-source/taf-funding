import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

const {
  PORT = 5000,
  CLIENT_ORIGIN,
  GOOGLE_SCRIPT_URL,
  GOOGLE_SCRIPT_SECRET,
  CRM_LOGIN_URL,
  CRM_SIGNUP_URL,
  CRM_API_KEY,
} = process.env;
const app = express();
app.set("trust proxy", 1);
app.use(
  helmet({ contentSecurityPolicy: false }),
  express.json({ limit: "20kb" }),
  cors({ origin: CLIENT_ORIGIN || true }),
);
const limiter = (max) =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max,
    standardHeaders: true,
    legacyHeaders: false,
  });
const ok = (e) => /^\S+@\S+\.\S+$/.test(e || "");
const wrap = (f) => (req, res) =>
  f(req, res).catch((e) => {
    console.error(e);
    res.status(500).json({ message: "Server error. Try again." });
  });

// ---- Login / Sign up: handled by the CRM; this server only relays the request ----
const viaCrm = (url, signup) =>
  wrap(async (req, res) => {
    if (!url)
      return res
        .status(503)
        .json({ message: "Account system is not connected yet." });
    const { name, email, password, ref } = req.body;
    if (!ok(email))
      return res.status(400).json({ message: "Enter a valid email address." });
    if ((password || "").length < 8)
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters." });
    if (signup && !name?.trim())
      return res.status(400).json({ message: "Enter your full name." });
    const r = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(CRM_API_KEY && { Authorization: `Bearer ${CRM_API_KEY}` }),
      },
      body: JSON.stringify(
        signup ? { name, email, password, ref } : { email, password },
      ),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok)
      return res
        .status(r.status)
        .json({ message: j.message || j.error || "Request failed." });
    res.json({
      token: j.token || j.accessToken || j.data?.token,
      user: j.user ||
        j.data?.user || { name: name || email.split("@")[0], email },
      redirect: j.redirect,
    });
  });
app.post("/api/auth/signup", limiter(20), viaCrm(CRM_SIGNUP_URL, true));
app.post("/api/auth/login", limiter(30), viaCrm(CRM_LOGIN_URL, false));

// ---- Contact form: every message is saved as a row in a Google Sheet (via Apps Script) ----
app.post(
  "/api/contact",
  limiter(10),
  wrap(async (req, res) => {
    const { name, email, phone = "", message, website } = req.body;
    if (website) return res.json({ ok: true }); // spam trap
    if (!name?.trim() || !ok(email) || !message?.trim())
      return res
        .status(400)
        .json({ message: "Fill in your name, a valid email and a message." });
    if (!GOOGLE_SCRIPT_URL)
      return res
        .status(503)
        .json({ message: "Contact form is not connected yet." });
    try {
      const r = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: new URLSearchParams({
          name,
          email,
          phone,
          message,
          secret: GOOGLE_SCRIPT_SECRET || "",
        }),
        signal: AbortSignal.timeout(15000),
      });
      const t = (await r.text()).trim();
      if (!r.ok || t !== "ok")
        throw new Error(
          `Google Sheet responded ${r.status}: ${t.slice(0, 120)}`,
        );
    } catch (e) {
      console.error("Contact delivery failed:", e.message);
      return res
        .status(502)
        .json({ message: "Could not send your message. Please try again." });
    }
    res.status(201).json({ ok: true });
  }),
);

const dist = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../client/dist",
);
app.use(express.static(dist));
app.get("*", (req, res) =>
  res.sendFile(
    path.join(dist, "index.html"),
    (e) => e && res.status(404).end(),
  ),
);
app.listen(PORT, () => console.log(`Server on :${PORT}`));
