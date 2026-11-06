// Shared rules for the contact form (the server re-checks the same rules).
export const LIMITS = { name: [2, 80], message: [10, 2000] };

export function cleanPhone(v = "") {
  // keep digits, and a single leading "+"
  const s = String(v).trim();
  const digits = s.replace(/\D/g, "");
  return (s.startsWith("+") ? "+" : "") + digits;
}

export function formatPhone(v = "") {
  const p = cleanPhone(v);
  if (!p) return "";
  const intl = p.startsWith("+");
  const d = p.replace("+", "");
  // group in blocks of 3-4 for readability: +91 98765 43210
  const cc = intl ? d.slice(0, d.length > 10 ? d.length - 10 : 2) : "";
  const rest = intl ? d.slice(cc.length) : d;
  const grouped = rest.replace(/(\d{5})(?=\d)/g, "$1 ").trim();
  return intl ? `+${cc} ${grouped}`.trim() : grouped;
}

export const check = {
  name(v) {
    const s = String(v || "").trim().replace(/\s+/g, " ");
    if (!s) return "Enter your full name.";
    if (s.length < LIMITS.name[0]) return "Name is too short.";
    if (s.length > LIMITS.name[1]) return "Name is too long.";
    if (!/^[\p{L}][\p{L}\p{M}.'’\- ]*$/u.test(s)) return "Use letters only (no numbers or symbols).";
    return "";
  },
  email(v) {
    const s = String(v || "").trim();
    if (!s) return "Enter your email address.";
    if (s.length > 254) return "Email address is too long.";
    const m = /^([A-Za-z0-9._%+\-]+)@([A-Za-z0-9\-]+(?:\.[A-Za-z0-9\-]+)*\.[A-Za-z]{2,})$/.exec(s);
    if (!m || m[1].length > 64 || /\.\./.test(s) || /^\./.test(m[1]) || /\.$/.test(m[1]))
      return "Enter a valid email, like name@example.com.";
    if (m[2].split(".").some((p) => !p || p.startsWith("-") || p.endsWith("-")))
      return "Enter a valid email, like name@example.com.";
    return "";
  },
  phone(v) {
    const raw = String(v || "").trim();
    if (!raw) return "Enter your phone number.";
    if (/[^\d+\-()\s]/.test(raw) || raw.indexOf("+") > 0) return "Use digits only, with an optional + at the start.";
    const n = cleanPhone(raw).replace("+", "").length;
    if (n < 8) return "Phone number is too short. Include your country code.";
    if (n > 15) return "Phone number is too long (max 15 digits).";
    if (/^(\d)\1+$/.test(cleanPhone(raw).replace("+", ""))) return "Enter a real phone number.";
    return "";
  },
  message(v) {
    const s = String(v || "").trim();
    if (!s) return "Write a message.";
    if (s.length < LIMITS.message[0]) return `Message must be at least ${LIMITS.message[0]} characters.`;
    if (s.length > LIMITS.message[1]) return `Message must be under ${LIMITS.message[1]} characters.`;
    return "";
  },
};
