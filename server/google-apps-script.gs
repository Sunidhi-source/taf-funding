// Saves every contact-form message as a new row in the Google Sheet this script is attached to.
// Full step-by-step guide: GOOGLE_SHEET_SETUP.md

// OPTIONAL but recommended: any random text. Must match GOOGLE_SCRIPT_SECRET in server/.env.
// Leave as '' to turn the check off.
const SECRET = "taf_secure_contact_key_2026";

const HEADERS = ["Time", "Name", "Email", "Phone", "Message"];

function doPost(e) {
  const p = (e && e.parameter) || {};
  if (SECRET && p.secret !== SECRET)
    return ContentService.createTextOutput("forbidden");

  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // avoids two simultaneous messages overwriting each other
  try {
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sh.getLastRow() === 0) {
      sh.appendRow(HEADERS);
      sh.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sh.setFrozenRows(1);
    }
    const row = sh.getLastRow() + 1;
    // Plain-text format BEFORE writing: keeps "+92 300..." as typed and stops =formulas from running.
    sh.getRange(row, 2, 1, 4).setNumberFormat("@");
    sh.getRange(row, 1, 1, 5).setValues([
      [new Date(), str(p.name), str(p.email), str(p.phone), str(p.message)],
    ]);
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput("ok");
}

// Opening the web-app URL in a browser should say it's alive (handy for testing the deployment).
function doGet() {
  return ContentService.createTextOutput("Contact form endpoint is running.");
}

function str(v) {
  return String(v || "");
}
