// Small helpers shared by the Vercel functions (and the local Express server).
const hits = new Map();

// Best-effort per-IP limiter (memory is per serverless instance; enough to stop casual spam).
export function limited(req, max = 10, windowMs = 15 * 60 * 1000) {
  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "?").split(",")[0].trim();
  const now = Date.now();
  const key = `${req.url}|${ip}`;
  const arr = (hits.get(key) || []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(key, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > max;
}

export function body(req) {
  const b = req.body;
  if (b && typeof b === "object") return b;
  try { return JSON.parse(b || "{}"); } catch { return {}; }
}

export const send = (res, status, json) => res.status(status).json(json);

export function post(handler, max) {
  return async (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return send(res, 405, { message: "Method not allowed." });
    }
    if (limited(req, max)) return send(res, 429, { message: "Too many requests. Try again in a few minutes." });
    try {
      await handler(req, res, body(req));
    } catch (e) {
      console.error(`Error: ${e.message}`);
      send(res, 500, { message: "Server error. Try again." });
    }
  };
}
