# The Absel Funding – React + Express (no database)
Pages: Home, Trading Rules, Affiliate Program, Contact Us, plus Login/Sign up.

## Run locally
1. `npm run install:all`
2. `cp .env.example server/.env` and fill it in
3. `npm run dev`  → site on http://localhost:5173, API on :5000

## Production
`npm run build` then `npm start` (Express serves client/dist and the API on one port).

## Contact form (no database)
Each message is appended as a row to a Google Sheet in your Drive through a small Google Apps Script
(`server/google-apps-script.gs`). Put its URL in `GOOGLE_SCRIPT_URL` (and optionally `GOOGLE_SCRIPT_SECRET`).
Step-by-step guide: **[GOOGLE_SHEET_SETUP.md](GOOGLE_SHEET_SETUP.md)**.

## CRM
Login and sign up are relayed to CRM_LOGIN_URL / CRM_SIGNUP_URL (JSON POST: `{email,password}` and `{name,email,password,ref}`).
The server accepts a response with `token` (or `accessToken`), `user` and an optional `redirect`; tell me the CRM's real
response shape and I'll match it. Optional client env `VITE_CRM_CHECKOUT_URL` sends "Buy plan" to the CRM checkout.
Affiliate links: share `https://yoursite.com/?ref=CODE`; the code is passed to the CRM on sign up.
