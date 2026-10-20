# Google Sheets lead capture

The contact API sends each valid inquiry to a Google Apps Script web app. The script appends it to a `Leads` tab and adds editable sales columns for status, owner, next follow-up, and notes. The URL and shared token stay on the server; they must not be added to browser code or committed in `.env.local`.

## Connect a sheet

1. Create a Google Sheet for THINK sales leads and copy its ID from the sheet URL (`/spreadsheets/d/<ID>/edit`).
2. In the sheet, open **Extensions → Apps Script**. Replace the editor contents with [`scripts/google-sheets-contact-webhook.gs`](../scripts/google-sheets-contact-webhook.gs) and save.
3. In Apps Script, open **Project Settings → Script Properties** and add:
   - `CONTACT_SHEET_ID`: the ID from step 1.
   - `CONTACT_WEBHOOK_TOKEN`: a long random secret (at least 32 characters).
4. Deploy **Deploy → New deployment → Web app**. Run it as your account so it can write to your sheet. Set access to **Anyone** so the website server can call it; the script rejects requests without the secret token. Authorize the deployment, then copy its web app URL.
5. Add these values to the hosting provider's server environment variables (and optionally local `.env.local` for local testing):

   ```env
   GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
   GOOGLE_SHEETS_WEBHOOK_TOKEN=the_same_random_secret
   ```

6. Redeploy/restart the website. Submit a test inquiry and confirm it appears on the `Leads` sheet. Give the sales team access to that sheet and they can maintain the sales columns there.

Do not commit `.env.local` or put these values in `NEXT_PUBLIC_*` variables. After changing Apps Script code, create a new deployment version for the existing web app deployment.
