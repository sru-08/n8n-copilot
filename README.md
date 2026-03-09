# N8N Copilot Backend Server

## Quick Setup & Run

### Step 1: In your `n8n-copilot-backend` folder, copy the server code

The file `server.js` should be in your project folder.

### Step 2: Install dependencies (you already did this!)

```bash
npm install express axios dotenv
```

### Step 3: Create `.env` file

Create a file named `.env` in your project folder with this content:

```
GROQ_API_KEY=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
AIRTABLE_TOKEN=patOSp4rdH3LjbKT7.64d1597860059e1f27d1343f2619011dd9fa7a38bce300b402558ef3b8c9c61c
AIRTABLE_BASE_ID=appto4Vzgoo9sxJmt
AIRTABLE_TABLE_NAME=Table 1
PORT=3000
```

### Step 4: Start the server

```bash
node server.js
```

You should see:

```
🚀 N8N Copilot Backend Server running on http://localhost:3000
📡 Webhook endpoint: http://localhost:3000/webhook
💚 Health check: http://localhost:3000/health

✅ Ready to receive requests from chrome extension!
```

---

## How to Test

### Test 1: Health Check (Browser or Postman)

Open your browser and go to:
```
http://localhost:3000/health
```

Should return:
```json
{ "status": "Server is running" }
```

### Test 2: Send a Test Command from Chrome Extension

1. Go to your n8n instance in the browser
2. Open the Chrome Extension (Automation Magic)
3. Type in the input: `Create a workflow that sends emails`
4. Click SEND
5. Wait 5-10 seconds for the response

The extension should display the generated workflow JSON!

### Test 3: Manual Webhook Test (using curl or Postman)

```bash
curl -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "command": "Create a workflow that sends emails",
    "platform": "n8n",
    "sessionId": "test-session"
  }'
```

---

## What This Server Does

1. **Receives** the command from chrome extension
2. **Fetches** all 120 workflows from Airtable
3. **Finds** the top 3 most similar workflows (using keyword matching)
4. **Calls Groq API** to generate a new workflow JSON based on those examples
5. **Validates** the JSON
6. **Sends back** the generated workflow to the chrome extension

---

## Troubleshooting

### Error: "Cannot find module 'express'"
```bash
npm install express axios dotenv
```

### Error: "EADDRINUSE: address already in use :::3000"
The port 3000 is already in use. Either:
- Kill the process using port 3000
- Change PORT in `.env` to something else (e.g., 3001)

### Chrome Extension shows "404 Not Found"
Make sure you're pointing the extension webhook to the correct URL. Update the `WEBHOOK_URL` in your `content.js` to:
```javascript
const WEBHOOK_URL = 'http://localhost:3000/webhook';
```

### No response from server
1. Check that the server is running (`node server.js`)
2. Check that Groq API key is valid
3. Check that Airtable token is valid
4. Look at console logs for error messages

---

## Next Steps (After Testing)

1. Once this works, we'll update the chrome extension webhook URL to point to this server
2. Then we can test the full flow: Extension → Server → Airtable → Groq → Response
3. After that works perfectly, we can migrate to n8n if needed

---

## Architecture Overview

```
Chrome Extension
      ↓ (sends command)
Node.js Server (localhost:3000)
      ↓
Airtable (fetches 120 workflows)
      ↓
Groq API (generates new workflow)
      ↓
Response (JSON back to extension)
```

Good luck! 🚀
