/**
 * THINK website lead intake for Google Sheets.
 * Deploy as a web app, then set these Script Properties:
 *   CONTACT_SHEET_ID
 *   CONTACT_WEBHOOK_TOKEN
 */
function doPost(e) {
  var lock;
  var locked = false;
  try {
    var properties = PropertiesService.getScriptProperties();
    var sheetId = properties.getProperty('CONTACT_SHEET_ID');
    var expectedToken = properties.getProperty('CONTACT_WEBHOOK_TOKEN');
    if (!sheetId || !expectedToken) return json_({ ok: false });

    var payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (!payload.token || payload.token !== expectedToken) return json_({ ok: false });

    lock = LockService.getScriptLock();
    lock.waitLock(10000);
    locked = true;

    var spreadsheet = SpreadsheetApp.openById(sheetId);
    var sheet = spreadsheet.getSheetByName('Leads') || spreadsheet.insertSheet('Leads');
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Received at', 'Lead status', 'Sales owner', 'Next follow-up', 'Name',
        'Company', 'Email', 'Phone', 'Service', 'Budget', 'Project details', 'Source', 'Sales notes',
      ]);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(), 'New', '', '',
      safeCell_(payload.name), safeCell_(payload.company), safeCell_(payload.email),
      safeCell_(payload.phone), safeCell_(payload.service), safeCell_(payload.budget),
      safeCell_(payload.details), safeCell_(payload.source), '',
    ]);
    return json_({ ok: true });
  } catch (error) {
    console.error('Contact lead delivery failed:', error && error.message);
    return json_({ ok: false });
  } finally {
    if (locked) lock.releaseLock();
  }
}

function safeCell_(value) {
  var text = String(value == null ? '' : value).trim().slice(0, 4000);
  // Keep submitted text as text, so a lead cannot inject a spreadsheet formula.
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
