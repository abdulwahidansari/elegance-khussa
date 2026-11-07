# Receiving orders and newsletter signups

The site has no database yet. Orders and signups are POSTed as JSON to `FORMS_WEBHOOK_URL`.
If it is not set, checkout and the newsletter form tell the visitor that ordering/signup is not switched on.
Nothing is ever shown as "received" unless the webhook accepted it.

Set `FORMS_WEBHOOK_URL` in Vercel (Project > Settings > Environment Variables), then redeploy.
Anything that accepts a JSON webhook works: Make, Zapier, n8n, or a Google Apps Script (below).

## Payload

Order: `{ "type": "order", "receivedAt", "ref", "paymentMethod": "cash on delivery", "name", "phone", "city", "address", "items": [{ "slug", "name", "size", "qty", "unitPrice", "sample" }], "subtotal" }`

Newsletter: `{ "type": "newsletter", "receivedAt", "email" }`

Prices are recalculated on the server from the product list; the browser's prices are ignored.

## Google Sheet via Apps Script (not tested here)

1. Create a Google Sheet. Extensions > Apps Script. Paste:

```js
function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(d.type) ||
              SpreadsheetApp.getActiveSpreadsheet().insertSheet(d.type);
  if (d.type === "order") {
    sheet.appendRow([d.receivedAt, d.ref, d.name, d.phone, d.city, d.address,
      d.items.map(function (i) { return i.name + " EU" + i.size + " x" + i.qty; }).join("; "), d.subtotal]);
  } else {
    sheet.appendRow([d.receivedAt, d.email]);
  }
  return ContentService.createTextOutput("ok");
}
```

2. Deploy > New deployment > Web app > Execute as: Me, Who has access: Anyone. Copy the web app URL into `FORMS_WEBHOOK_URL`.
3. Place a test order with `ALLOW_SAMPLE_ORDERS=true`, check the sheet, then set it back to `false`.

## Known limits

No rate limiting or CAPTCHA (a hidden honeypot field stops simple bots). Add one before heavy traffic.
Orders and emails live wherever your webhook sends them; treat that place as customer data (see the privacy policy page).
