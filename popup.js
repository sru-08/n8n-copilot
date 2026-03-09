// ===== CONFIGURATION =====
const SERVER_URL = 'http://localhost:3000/webhook';

// ===== DOM ELEMENTS =====
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesArea = document.getElementById('messagesArea');
const statusBar = document.getElementById('statusBar');

// ===== EVENT LISTENERS =====

/**
 * Send message when user clicks Send button
 */
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        sendMessage(message);
    }
});

/**
 * Send message when user presses Enter
 */
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        const message = messageInput.value.trim();
        if (message) {
            sendMessage(message);
        }
    }
});

// ===== MAIN FUNCTIONS =====

/**
 * Send message to Node.js server
 */
async function sendMessage(message) {
    console.log('Sending message:', message);

    // Display user message
    addMessageToChat(message, 'user');

    // Clear input
    messageInput.value = '';
    sendButton.disabled = true;
    messageInput.disabled = true;

    // Show loading indicator
    updateStatus('⏳ Processing...');

    try {
        // Send to Node.js server
        const response = await fetch(SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                command: message,
                platform: 'n8n',
                sessionId: generateSessionId(),
            }),
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log('Response data:', data);

        if (data.status === 'success') {
            // Display the response
            displayWorkflowResponse(data);
            updateStatus('✅ Workflow generated!');
        } else {
            displayError(data.message || 'Failed to generate workflow');
            updateStatus('❌ Error');
        }
    } catch (error) {
        console.error('Error:', error);
        displayError(`Error: ${error.message}`);
        updateStatus('❌ Failed to connect to server');
    } finally {
        sendButton.disabled = false;
        messageInput.disabled = false;
        messageInput.focus();
    }
}

/**
 * Display workflow response with JSON and download option
 */
function displayWorkflowResponse(data) {
    // Display description
    if (data.display_text) {
        addMessageToChat(data.display_text, 'assistant');
    }

    // Display JSON code
    if (data.json_data) {
        displayJsonCode(data.json_data);
    }

    // Display top workflows used
    if (data.topWorkflows && data.topWorkflows.length > 0) {
        displayTopWorkflows(data.topWorkflows);
    }
}

/**
 * Display the generated JSON code with copy and download buttons
 */
function displayJsonCode(jsonData) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant-message';

    // Create code block
    const codeBlock = document.createElement('div');
    codeBlock.className = 'code-block';

    const preElement = document.createElement('pre');
    preElement.textContent = typeof jsonData === 'string' ? jsonData : JSON.stringify(JSON.parse(jsonData), null, 2);
    codeBlock.appendChild(preElement);

    // Create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    // Copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'action-button copy-button';
    copyButton.textContent = '📋 Copy';
    copyButton.addEventListener('click', () => {
        const text = preElement.textContent;
        navigator.clipboard.writeText(text).then(() => {
            copyButton.textContent = '✅ Copied!';
            setTimeout(() => {
                copyButton.textContent = '📋 Copy';
            }, 2000);
        });
    });

    // Download button
    const downloadButton = document.createElement('button');
    downloadButton.className = 'action-button download-button';
    downloadButton.textContent = '⬇️ Download';
    downloadButton.addEventListener('click', () => {
        const text = preElement.textContent;
        const blob = new Blob([text], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'workflow.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    buttonContainer.appendChild(copyButton);
    buttonContainer.appendChild(downloadButton);

    messageDiv.appendChild(codeBlock);
    messageDiv.appendChild(buttonContainer);
    messagesArea.appendChild(messageDiv);
    scrollToBottom();
}

/**
 * Display the top 3 workflows that were used as examples
 */
function displayTopWorkflows(topWorkflows) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant-message info-message';

    const title = document.createElement('h4');
    title.textContent = '📚 Generated from these workflows:';
    messageDiv.appendChild(title);

    const list = document.createElement('ul');
    topWorkflows.forEach((workflow, index) => {
        const item = document.createElement('li');
        item.textContent = `${index + 1}. ${workflow.description}`;
        list.appendChild(item);
    });
    messageDiv.appendChild(list);

    messagesArea.appendChild(messageDiv);
    scrollToBottom();
}

/**
 * Display error message
 */
function displayError(errorMessage) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message error-message';
    messageDiv.textContent = '❌ ' + errorMessage;
    messagesArea.appendChild(messageDiv);
    scrollToBottom();
}

/**
 * Add message to chat (user or assistant)
 */
function addMessageToChat(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    if (sender === 'user') {
        messageDiv.textContent = message;
    } else if (sender === 'assistant') {
        messageDiv.innerHTML = `<strong>Assistant:</strong> ${message}`;
    }

    messagesArea.appendChild(messageDiv);
    scrollToBottom();
}

/**
 * Update status bar
 */
function updateStatus(message) {
    statusBar.textContent = message;
}

/**
 * Scroll to bottom of messages
 */
function scrollToBottom() {
    messagesArea.scrollTop = messagesArea.scrollHeight;
}

/**
 * Generate a simple session ID
 */
function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// ===== INITIALIZATION =====
console.log('N8N Copilot Extension loaded!');
messageInput.focus();
