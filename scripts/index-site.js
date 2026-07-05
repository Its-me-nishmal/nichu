const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

// Path to your service account key file
const KEY_FILE = path.join(__dirname, "service-account.json");
const SITE_URL = "https://nichu.dev";

if (!fs.existsSync(KEY_FILE)) {
  console.error("❌ Error: service-account.json not found in the scripts directory!");
  console.log("Please follow the setup steps to download your JSON key and save it here.");
  process.exit(1);
}

const auth = new google.auth.GoogleAuth({
  keyFile: KEY_FILE,
  scopes: ["https://www.googleapis.com/auth/indexing"],
});

async function requestIndexing() {
  try {
    const authClient = await auth.getClient();
    const indexing = google.indexing({
      version: "v3",
      auth: authClient,
    });

    console.log(`🚀 Sending index request for: ${SITE_URL}...`);

    const res = await indexing.urlNotifications.publish({
      requestBody: {
        url: SITE_URL,
        type: "URL_UPDATED",
      },
    });

    console.log("✅ Success! Google Indexing API Response:");
    console.log(JSON.stringify(res.data, null, 2));
  } catch (error) {
    console.error("❌ Failed to trigger Google Indexing API:");
    console.error(error.message);
  }
}

requestIndexing();
