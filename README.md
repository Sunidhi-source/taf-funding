# The Absel Funding (TAF)
React (Vite) site + serverless API. Deploys to **Vercel** with no extra server.

```
client/   React site (Home, Trading Rules, Affiliate, Contact, Login/Sign up)
api/      Vercel serverless functions: /api/contact, /api/auth/login, /api/auth/signup
server/   Local dev server only (runs the same /api code on :5000). Not used on Vercel.
```

## Run locally
1. `npm run install:all`
2. `cp server/.env.example server/.env` and fill it in (see GOOGLE_CLOUD_SETUP.md)
3. `npm run dev` → site on http://localhost:5173

## Deploy to Vercel
1. Push this folder to GitHub and import the repo in Vercel (leave the root directory as is; `vercel.json` has all settings).
2. Project → Settings → Environment Variables, add (Production + Preview):
   `GOOGLE_SHEET_ID`, `GOOGLE_SHEET_TAB`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`
   (paste the key exactly as in the JSON, including the `\n`), optional `SHEET_TIMEZONE`,
   and `CRM_LOGIN_URL`, `CRM_SIGNUP_URL`, `CRM_API_KEY`, `VITE_CRM_CHECKOUT_URL` if you use the CRM.
3. Deploy. Redeploy after changing any variable.

Note: do not use `GOOGLE_SERVICE_ACCOUNT_FILE` on Vercel (that is for local use only).

## Contact form
Validated in the browser and again on the server (name, email, phone with country code, message),
then appended to your Google Sheet through the Google Sheets API using a Google Cloud service account.

## CRM
Login and sign up are relayed to `CRM_LOGIN_URL` / `CRM_SIGNUP_URL` (JSON POST). Affiliate links: `https://yoursite.com/?ref=CODE`.
