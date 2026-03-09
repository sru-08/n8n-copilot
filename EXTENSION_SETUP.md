# N8N Copilot - Chrome Extension Setup Guide

## 📁 Files You Need

You should have 4 files for the extension:

1. **manifest.json** - Extension blueprint
2. **popup.html** - Chat UI
3. **popup.js** - Chat logic
4. **styles.css** - Styling

---

## 🚀 Installation Steps

### Step 1: Create Extension Folder

Create a new folder anywhere on your computer:

```
C:\Users\YourName\Desktop\n8n-copilot-extension\
```

(or `/Users/YourName/Desktop/n8n-copilot-extension/` on Mac)

### Step 2: Copy the 4 Files

Copy these 4 files into that folder:
- manifest.json
- popup.html
- popup.js
- styles.css

Your folder should look like:

```
n8n-copilot-extension/
├── manifest.json
├── popup.html
├── popup.js
└── styles.css
```

### Step 3: Load Extension into Chrome

1. Open Chrome
2. Go to: `chrome://extensions/`
3. Turn ON **"Developer mode"** (toggle in top-right corner)
4. Click **"Load unpacked"**
5. Navigate to your extension folder (`n8n-copilot-extension`)
6. Click **"Select Folder"**

**You should see the extension appear in the list!**

### Step 4: Pin the Extension

1. Click the **puzzle icon** in Chrome toolbar (top-right)
2. Find **"N8N Copilot"**
3. Click the **pin icon** next to it
4. Now the extension icon will always be visible in your toolbar!

---

## ✅ Test the Extension

### Prerequisites

Make sure your Node.js backend server is running:

```bash
node server.js
```

You should see:
```
🚀 N8N Copilot Backend Server running on http://localhost:3000
✅ Ready to receive requests from chrome extension!
```

### Test Steps

1. **Click the N8N Copilot icon** in Chrome toolbar
2. A popup should open with the chat interface
3. Type a message: `Create a workflow that sends emails`
4. Click **Send**
5. Wait 5-10 seconds for response
6. You should see the generated workflow JSON!

---

## 🐛 Troubleshooting

### Issue: Extension doesn't appear in Chrome

**Solution:**
- Go to `chrome://extensions/`
- Make sure the folder has all 4 files (manifest.json, popup.html, popup.js, styles.css)
- Try clicking "Load unpacked" again

### Issue: Clicking extension does nothing

**Solution:**
- Check browser console for errors (F12)
- Make sure the 4 files are in the correct folder
- Try toggling the extension off/on in `chrome://extensions/`

### Issue: "Error: Failed to fetch"

**Solution:**
- Make sure Node.js backend is running (`node server.js`)
- Check that it's running on `http://localhost:3000`
- Check that you don't have CORS blocking (our server has CORS headers, so this should work)

### Issue: "Failed to connect to server"

**Solution:**
1. Check backend server is running
2. Verify the `SERVER_URL` in `popup.js` is: `http://localhost:3000/webhook`
3. Try reloading the extension (F5 or toggle in `chrome://extensions/`)

### Issue: Server responds but no JSON shown

**Solution:**
- Check browser console (F12) for errors
- Verify Airtable token is correct in server.js
- Verify Groq API key is correct in server.js

---

## 📝 How to Use

1. **Open the extension** (click the icon in toolbar)
2. **Type your request** in the input field
   - Examples:
     - "Create a workflow that sends emails"
     - "Build a workflow for data validation"
     - "Generate a webhook handler workflow"
3. **Click Send** or press Enter
4. **Wait for response** (5-10 seconds)
5. **Copy or Download** the generated JSON
   - 📋 Copy: Copy JSON to clipboard
   - ⬇️ Download: Download as workflow.json file

---

## 🔄 Update Extension Code

If you need to make changes to the extension:

1. Edit the file (popup.js, styles.css, etc.)
2. Go to `chrome://extensions/`
3. Click the **refresh icon** on the N8N Copilot card
4. Close and reopen the popup to see changes

---

## 🎯 Next Steps

Once this is working:

1. Test with different workflow requests
2. Check the generated JSON in n8n to make sure it's valid
3. Improve the backend logic (better search, better prompts)
4. Add more features (image input, workflow templates, etc.)

---

## 📞 Quick Reference

| Problem | Solution |
|---------|----------|
| Extension doesn't load | Make sure all 4 files are in folder |
| "Failed to fetch" error | Backend server not running |
| No response | Check backend logs in terminal |
| Extension missing | Go to `chrome://extensions/` and load unpacked |
| Changes not showing | Refresh extension in `chrome://extensions/` |

---

Good luck! 🚀
