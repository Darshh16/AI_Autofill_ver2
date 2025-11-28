# AI-Powered Autoform Filler 🚀

A lightning-fast browser extension that fills forms in seconds using AI-powered suggestions. Built with React, Vite, and Groq AI for intelligent, personalized form completion.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)

## ✨ Features

- **⚡ One-Click Form Filling**: Complete entire forms in seconds
- **🤖 AI-Powered Suggestions**: Intelligent field completion using Groq AI
- **📄 Resume Parsing**: Upload your resume for personalized suggestions
- **🎯 Context-Aware**: AI understands form context for accurate completions
- **⚙️ Easy Configuration**: Simple API key setup
- **🔒 Privacy-Focused**: Your data stays secure and local
- **🎨 Modern UI**: Clean and intuitive interface built with React

## 🛠️ Tech Stack

- **Frontend**: React 18.x
- **Build Tool**: Vite 5.x
- **AI Engine**: Groq AI API
- **Bundler**: Vite with HMR (Hot Module Replacement)
- **Linting**: ESLint
- **Extension**: Browser Extension (Chrome/Firefox compatible)

## 📋 Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager
- Groq AI API key ([Get it here](https://console.groq.com/))
- Modern web browser (Chrome, Firefox, Edge)

## 🚀 Installation

### Development Setup

1. **Clone the repository**:
```bash
git clone https://github.com/Darshh16/ai-autoform-filler.git
cd ai-autoform-filler
```

2. **Install dependencies**:
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**:
Create a `.env` file in the root directory:
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

4. **Start development server**:
```bash
npm run dev
# or
yarn dev
```

5. **Build for production**:
```bash
npm run build
# or
yarn build
```

### Browser Extension Installation

1. Build the extension:
```bash
npm run build
```

2. Load in Chrome/Edge:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder

3. Load in Firefox:
   - Open `about:debugging#/runtime/this-firefox`
   - Click "Load Temporary Add-on"
   - Select the `manifest.json` from `dist` folder

## 💻 Usage

### Basic Form Filling

1. Click the extension icon in your browser toolbar
2. Navigate to any form on the web
3. Click "Auto-Fill Form" button
4. Watch as AI intelligently completes the form!

### Resume-Based Filling

1. Click "Upload Resume" in the extension popup
2. Select your PDF/DOCX resume
3. The AI will parse your resume and extract key information
4. Navigate to job applications or professional forms
5. Click "Auto-Fill with Resume" for personalized suggestions

### Manual AI Suggestions

1. Focus on any form field
2. Right-click and select "Get AI Suggestion"
3. Review and accept the AI-generated content
4. Continue to next field


## ⚙️ Configuration

### API Key Setup

1. Get your Groq API key from [Groq Console](https://console.groq.com/)
2. Open the extension popup
3. Navigate to Settings
4. Enter your API key
5. Click "Save"

### Customizing AI Behavior


```javascript
const AI_CONFIG = {
  model: "mixtral-8x7b-32768",
  temperature: 0.7,
  maxTokens: 1024,
  // Adjust these for different AI behavior
};
```

## 🎯 Features Breakdown

### Resume Parser
- Supports PDF format
- Extracts: Name, Email, Phone, Skills, Experience, Education
- Stores parsed data locally for quick access
- Privacy-focused: No data sent to external servers (except AI API)

### AI Suggestions
- Context-aware field completion
- Learns from form structure
- Provides multiple suggestion options
- Smart matching with resume data

### Form Detection
- Automatically detects all fillable fields
- Identifies field types (text, email, phone, etc.)
- Groups related fields for batch filling
- Handles dynamic forms and SPAs

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server with HMR
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
```

### React Plugins

This template uses:
- **@vitejs/plugin-react**: Uses Babel for Fast Refresh
- Alternative: **@vitejs/plugin-react-swc** for SWC-based Fast Refresh

To switch to SWC:
```bash
npm install -D @vitejs/plugin-react-swc
```

Update `vite.config.js`:
```javascript
import react from '@vitejs/plugin-react-swc'
```

## 🚀 Building for Production

### TypeScript (Optional)

To add TypeScript support:

1. Install dependencies:
```bash
npm install -D typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

2. Add `tsconfig.json`
3. Rename `.jsx` files to `.tsx`
4. See [Vite TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow ESLint rules
- Write clean, documented code
- Test all form filling scenarios
- Ensure privacy and security best practices

## 🔒 Privacy & Security

- **No Data Collection**: We don't collect or store your personal data
- **Local Processing**: Resume parsing happens locally in your browser
- **API Security**: API keys stored securely in browser storage
- **Minimal Permissions**: Extension requests only necessary permissions
- **Open Source**: Full transparency with open-source code

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This extension uses the Groq AI API. Please ensure you comply with:
- Groq AI's Terms of Service
- Rate limits and usage policies
- Your organization's policies on AI tool usage

## 🐛 Known Issues

- Some SPAs may require page refresh after form detection
- Resume parsing accuracy varies with document formatting
- Rate limits apply based on Groq AI plan

## 🗺️ Roadmap

- [ ] Multi-language support
- [ ] Custom field mapping
- [ ] Form templates library
- [ ] Advanced resume parsing (LinkedIn import)
- [ ] Team collaboration features
- [ ] Integration with password managers

## 🙏 Acknowledgments

- [Groq AI](https://groq.com/) for lightning-fast AI inference
- [Vite](https://vitejs.dev/) for blazing fast build tooling
- [React](https://react.dev/) for the UI framework
- Open-source community for inspiration

## 📧 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/ai-autoform-filler/issues)
- **Email**: support@example.com
- **Twitter**: [@yourhandle](https://twitter.com/yourhandle)

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/ai-autoform-filler?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/ai-autoform-filler?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/ai-autoform-filler)

---

<div align="center">
  <strong>⭐ Star this repo if you find it helpful! ⭐</strong>
  <br>
  Made with using React + Vite + Groq AI
  <br>
  <strong> Developer name- Darsh Jilka </strong>
</div>
