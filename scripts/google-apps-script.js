/**
 * Google Apps Script for Artless Moto Waitlist
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Copy the Sheet ID from the URL (the long string between /d/ and /edit)
 * 3. Go to Extensions > Apps Script
 * 4. Paste this code and replace SHEET_ID below with your actual Sheet ID
 * 5. Click Deploy > New deployment
 * 6. Select type: Web app
 * 7. Set "Execute as" to "Me"
 * 8. Set "Who has access" to "Anyone"
 * 9. Click Deploy and copy the Web app URL
 * 10. Set APPS_SCRIPT_URL to that URL in .env.local (local) and in Vercel
 *     Project Settings → Environment Variables (production/preview)
 */

// Replace this with your actual Google Sheet ID
const SHEET_ID = "YOUR_GOOGLE_SHEET_ID_HERE";

/**
 * Handles POST requests to add emails to the waitlist
 */
function doPost(e) {
  try {
    if (!e.postData || !e.postData.contents) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: "Missing POST body (expected JSON with email)" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    const email = data.email;
    
    if (!email) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: "Email is required" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Open the spreadsheet and use the first tab (reliable for headless runs)
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    
    // Add the email and timestamp as a new row
    const timestamp = new Date().toISOString();
    sheet.appendRow([email, timestamp]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests (for testing)
 */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      message: "Artless Moto Waitlist API is running. Send POST requests with {email: 'user@example.com'}" 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
