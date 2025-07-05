# 🔍 Toru.AI

# Toru.AI - Chrome Extension

A Chrome extension that acts as an AI copilot for your Gmail inbox, powered by Google Gemini. It helps you summarize unread emails, count unread emails, answer general questions, and draft professional emails—all from a floating, draggable chat widget on any page.

## Features
- **Summarize unread emails** in your Gmail inbox
- **Count unread emails**
- **Draft professional emails** with a single click
- **Answer general questions**
- **Draggable, floating chat widget** that works on any page
- **Modern, minimal UI**

## How It Works
- The extension injects a floating chat widget into every page.
- When you interact with the widget, it sends your chat history and (if needed) your Gmail inbox HTML to a local Flask backend (`app.py`).
- The backend uses Google Gemini to generate responses and email drafts.

## Setup Instructions

### 1. Clone the Repository
```
git clone <your-repo-url>
cd Toru.AI extension
```

### 2. Install Python Dependencies
Make sure you have Python 3.8+ and pip installed.

```
pip install -r requirements.txt
```

### 3. Set Up the Gemini API Key
Create a `.env` file in the project root with your Gemini API key:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run the Flask Backend
```
python app.py
```
The backend will start on `http://localhost:5000`.

### 5. Load the Extension in Chrome
1. Go to `chrome://extensions/` in your browser.
2. Enable **Developer mode** (top right).
3. Click **Load unpacked** and select the project folder.
4. The extension icon should appear in your browser.

## Usage
- Click the floating widget to open the chat.
- Ask questions, request email summaries, or draft emails.
- The extension will interact with your local backend and display responses in the chat.
- You can drag the widget anywhere on your screen.

## Development
- `content.js`: Main logic for the chat widget and UI.
- `app.py`: Flask backend for handling chat and Gemini API calls.
- `manifest.json`: Chrome extension manifest.
- `requirements.txt`: Python dependencies.

## Notes
- The extension only works with your local backend running.
- Your API key is never sent to the frontend or browser.
- For best results, use the extension while viewing your Gmail inbox.

