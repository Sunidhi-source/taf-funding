// Google Cloud → Google Sheets API (service account). No Apps Script involved.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { JWT } from "google-auth-library";

const here = path.dirname(fileURLToPath(import.meta.url));
const HEADERS = ["Time", "Name", "Email", "Phone", "Message"];

function credentials() {
  const {
    GOOGLE_SERVICE_ACCOUNT_FILE: file,
    GOOGLE_SERVICE_ACCOUNT_EMAIL: email,
    GOOGLE_PRIVATE_KEY: key,
  } = process.env;
  if (file) {
    // look in server/ first (where .env lives), then the project root, then treat as absolute
    const root = path.resolve(here, "../..");
    const found = [
      path.resolve(root, "server", file),
      path.resolve(root, file),
      path.resolve(file),
    ].find((f) => fs.existsSync(f));
    if (!found)
      throw new Error(
        `file not found: put it at server/${file.replace(/^\.\//, "")}`,
      );
    const j = JSON.parse(fs.readFileSync(found, "utf8"));
    return { email: j.client_email, key: j.private_key };
  }
  if (email && key) return { email, key: key.replace(/\\n/g, "\n") };
  return null;
}

export function sheetsStatus() {
  if (!process.env.GOOGLE_SHEET_ID)
    return "GOOGLE_SHEET_ID is missing in server/.env";
  try {
    if (!credentials())
      return "service account is missing in server/.env (GOOGLE_SERVICE_ACCOUNT_FILE or EMAIL + PRIVATE_KEY)";
  } catch (e) {
    return `cannot read the service-account file: ${e.message}`;
  }
  return "";
}

let jwt,
  headerReady = false;
const tab = () => process.env.GOOGLE_SHEET_TAB || "Sheet1";
const base = () =>
  `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(process.env.GOOGLE_SHEET_ID)}/values`;
const range = (r) => encodeURIComponent(`'${tab()}'!${r}`);

function client() {
  if (!jwt) {
    const c = credentials();
    jwt = new JWT({
      email: c.email,
      key: c.key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  }
  return jwt;
}

async function ensureHeader() {
  if (headerReady) return;
  const r = await client().request({ url: `${base()}/${range("A1:E1")}` });
  if (!r.data.values?.length) {
    await client().request({
      url: `${base()}/${range("A1:E1")}?valueInputOption=RAW`,
      method: "PUT",
      data: { values: [HEADERS] },
    });
  }
  headerReady = true;
}

export async function appendContact({ name, email, phone, message }) {
  await ensureHeader();
  const time = new Date().toLocaleString("sv-SE", {
    timeZone: process.env.SHEET_TIMEZONE || "Asia/Kolkata",
  });
  // RAW = stored exactly as typed (phone keeps its "+", "=formulas" never run)
  await client().request({
    url: `${base()}/${range("A:E")}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    method: "POST",
    data: { values: [[time, name, email, phone, message]] },
  });
}

// Turn Google's error into one readable line (no HTML dumps).
export function explain(e) {
  const status = e.response?.status || e.status || e.code;
  const msg = e.response?.data?.error?.message || e.message || "unknown error";
  const who = credentials()?.email || "your service account";
  const hint =
    status === 403
      ? ` → share the sheet with ${who} as Editor, and enable the Google Sheets API in Google Cloud`
      : status === 404
        ? ` → check GOOGLE_SHEET_ID and GOOGLE_SHEET_TAB (tab "${tab()}")`
        : status === 400 && /range/i.test(msg)
          ? ` → tab "${tab()}" not found; set GOOGLE_SHEET_TAB to the exact tab name`
          : /invalid_grant|DECODER|PEM/i.test(msg)
            ? " → the private key is wrong or malformed"
            : "";
  return `${status ? `[${status}] ` : ""}${msg.split("\n")[0].slice(0, 160)}${hint}`;
}
