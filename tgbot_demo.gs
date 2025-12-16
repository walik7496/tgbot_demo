// ===============================
// Configuration (DO NOT COMMIT REAL TOKENS)
// ===============================
var apiToken = "YOUR_TELEGRAM_BOT_TOKEN"; // use environment variables or script properties
var appUrl = "YOUR_GOOGLE_APPS_SCRIPT_WEBHOOK_URL";
var apiUrl = "https://api.telegram.org/bot" + apiToken;


// ===============================
// Set Telegram webhook
// ===============================
function setWebhook() {
var url = apiUrl + "/setWebhook?url=" + appUrl;
var res = UrlFetchApp.fetch(url).getContentText();
Logger.log(res);
}


// ===============================
// Handle incoming webhook
// ===============================
function doPost(e) {
var webhookData = JSON.parse(e.postData.contents);
var from = webhookData.message.from.id;
var text = webhookData.message.text || "";
var sendText = "";


if (text.length > 1) {
try {
// Remove dots and spaces
var normalized = text.replace(/[.\s]/g, '');


// Expect exactly 8 digits
if (/^\d{8}$/.test(normalized)) {
var r2 =
parseInt(normalized.substring(0, 2)) +
parseInt(normalized.substring(2, 4)) +
parseInt(normalized.charAt(4)) +
parseInt(normalized.charAt(5)) +
parseInt(normalized.charAt(6)) +
parseInt(normalized.charAt(7));


var r3 = r2 + parseInt(normalized.substring(2, 4)) * 3;


if (isFinite(r2) && isFinite(r3)) {
sendText = "Calculation result: " + r2 + " and " + r3 + ".";
} else {
sendText = "Calculation error. Please try another input.";
}
} else {
sendText = "Invalid format. Please provide an 8-digit number.";
}
} catch (error) {
sendText = "Unexpected error. Please try again.";
}
} else {
sendText = "Please send an 8-digit number for calculation.";
}


var url = apiUrl + "/sendMessage?parse_mode=HTML&chat_id=" + from + "&text=" + encodeURIComponent(sendText);
UrlFetchApp.fetch(url, { muteHttpExceptions: true });
}


// ===============================
// Reject GET requests
// ===============================
function doGet() {
return ContentService.createTextOutput("GET method is not supported");
}