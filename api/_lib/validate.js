// Same rules as client/src/validate.js — the server never trusts the browser.
export const clean = (b) => ({
  name: String(b.name || "").trim().replace(/\s+/g, " "),
  email: String(b.email || "").trim().toLowerCase(),
  phone: String(b.phone || "").trim(),
  message: String(b.message || "").trim(),
});

const digitsOf = (v) => v.replace(/\D/g, "");

export const check = {
  name(v) {
    if (!v) return "Enter your full name.";
    if (v.length < 2) return "Name is too short.";
    if (v.length > 80) return "Name is too long.";
    if (!/^[\p{L}][\p{L}\p{M}.'’\- ]*$/u.test(v)) return "Use letters only (no numbers or symbols).";
    return "";
  },
  email(v) {
    v = String(v || "").trim();
    if (!v) return "Enter your email address.";
    if (v.length > 254) return "Email address is too long.";
    const m = /^([A-Za-z0-9._%+\-]+)@([A-Za-z0-9\-]+(?:\.[A-Za-z0-9\-]+)*\.[A-Za-z]{2,})$/.exec(v);
    if (!m || m[1].length > 64 || /\.\./.test(v) || m[1].startsWith(".") || m[1].endsWith(".")) return "Enter a valid email, like name@example.com.";
    if (m[2].split(".").some((p) => !p || p.startsWith("-") || p.endsWith("-"))) return "Enter a valid email, like name@example.com.";
    return "";
  },
  phone(v) {
    if (!v) return "Enter your phone number.";
    if (!/^\+?\d+$/.test(v)) return "Use digits only, with an optional + at the start.";
    const d = digitsOf(v);
    if (d.length < 8) return "Phone number is too short. Include your country code.";
    if (d.length > 15) return "Phone number is too long (max 15 digits).";
    if (/^(\d)\1+$/.test(d)) return "Enter a real phone number.";
    return "";
  },
  message(v) {
    if (!v) return "Write a message.";
    if (v.length < 10) return "Message must be at least 10 characters.";
    if (v.length > 2000) return "Message must be under 2000 characters.";
    return "";
  },
};
