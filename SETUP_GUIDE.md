# AI Form Autofill Extension - Setup Guide

## ✅ Current Status
Your extension is **working correctly**! The Vite dev server is running and serving the popup UI.

## 🎯 How to Use the Extension

### Step 1: Load the Extension in Chrome

1. Open Chrome and navigate to: `chrome://extensions/`
2. Enable **"Developer mode"** (toggle switch in the top-right corner)
3. Click **"Load unpacked"** button
4. Navigate to and select: `C:\coding\web_new\dist`
5. The extension will appear in your extensions list

### Step 2: Pin the Extension

1. Click the puzzle piece icon in Chrome's toolbar
2. Find "AI Form Autofill" in the list
3. Click the pin icon to pin it to your toolbar

### Step 3: Configure the Extension

1. Click the extension icon in your toolbar
2. You'll see the popup with "No profiles yet"
3. Click the **"+ New"** button to create a profile
4. Fill in your information (name, email, phone, address, etc.)
5. Optionally upload your resume PDF for AI parsing
6. Click **"Save"** to save the profile

### Step 4: Add Your Groq API Key

1. Click the **Settings** icon (gear) in the popup header
2. Enter your Groq API key
3. Click **"Save"**

Get a free API key from: https://console.groq.com/keys

### Step 5: Use the AI Autofill

1. Navigate to any webpage with a form (e.g., job application, contact form)
2. Look for the **"AI Fill"** button in the bottom-right corner of the page
3. Click it to automatically fill the form with your profile data
4. The AI will intelligently map your profile information to the form fields

## 🔧 Development

- **Dev Server**: Keep `npm run dev` running while developing
- **Hot Reload**: Changes to your code will automatically reload the extension
- **After Code Changes**: Click the refresh icon on the extension card in `chrome://extensions/`

## 📁 Project Structure

```
src/
├── popup/           # Extension popup UI
│   ├── App.jsx     # Main popup component
│   └── main.jsx    # Popup entry point
├── content/         # Content script (runs on web pages)
│   └── index.jsx   # AI Fill button and form detection
├── background/      # Background service worker
│   └── index.js    # Message handling
├── components/      # Reusable UI components
│   ├── Layout.jsx
│   ├── ProfileList.jsx
│   ├── ProfileEditor.jsx
│   └── Settings.jsx
└── services/        # Business logic
    ├── storage.js  # Chrome storage API wrapper
    └── ai.js       # Groq AI integration
```

## 🐛 Troubleshooting

### Extension not appearing?
- Make sure you loaded the `dist` folder, not the root folder
- Check that Developer mode is enabled
- Try reloading the extension

### AI Fill button not showing?
- Make sure you have an active profile selected
- Check that the page has form fields
- Look in the browser console for errors

### Form not filling?
- Ensure you've added your Groq API key in Settings
- Check that you have an active profile selected
- Verify your API key is valid

## 🎨 What's Working

✅ Popup UI with profile management
✅ Profile creation and editing
✅ Resume PDF upload and parsing
✅ Groq API integration
✅ Content script with AI Fill button
✅ Intelligent form field detection
✅ Settings page for API key management
✅ Hot reload during development
