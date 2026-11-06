// Local dev / self-hosting server. On Vercel this file is NOT used: the same handlers in /api run as serverless functions.
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import helmet from "helmet";
import contact from "../api/contact.js";
import login from "../api/auth/login.js";
import signup from "../api/auth/signup.js";
import { sheetsStatus } from "../api/_lib/sheets.js";

const { PORT = 5000 } = process.env;
const app = express();
app.set("trust proxy", 1);
app.use(helmet({ contentSecurityPolicy: false }), express.json({ limit: "20kb" }));
app.all("/api/contact", contact);
app.all("/api/auth/login", login);
app.all("/api/auth/signup", signup);
app.use("/api", (req, res) => res.status(404).json({ message: "Not found." }));

const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), "../client/dist");
app.use(express.static(dist));
app.get("*", (req, res) => res.sendFile(path.join(dist, "index.html"), (e) => e && res.status(404).end()));

app.listen(PORT, () => {
  console.log(`API ready on :${PORT}`);
  const why = sheetsStatus();
  if (why) console.warn(`Contact form disabled: ${why}`);
});
