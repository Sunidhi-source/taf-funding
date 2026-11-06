import { post } from "./_lib/http.js";
import { check, clean } from "./_lib/validate.js";
import { appendContact, sheetsStatus, explain } from "./_lib/sheets.js";

export default post(async (req, res, b) => {
  if (b.website) return res.json({ ok: true }); // spam trap
  const data = clean(b);
  const errors = {};
  for (const k of ["name", "email", "phone", "message"]) {
    const m = check[k](data[k]);
    if (m) errors[k] = m;
  }
  if (Object.keys(errors).length)
    return res.status(400).json({ message: "Please fix the highlighted fields.", errors });
  if (sheetsStatus()) {
    console.error(`Contact form disabled: ${sheetsStatus()}`);
    return res.status(503).json({ message: "Contact form is not connected yet." });
  }
  try {
    await appendContact(data);
  } catch (e) {
    console.error(`Contact not saved: ${explain(e)}`);
    return res.status(502).json({ message: "Could not send your message. Please try again." });
  }
  res.status(201).json({ ok: true });
}, 10);
