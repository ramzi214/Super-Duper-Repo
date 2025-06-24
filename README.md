# Ramzi Arcade's Super Duper Computer

A powerful AI-powered development environment with unlimited capabilities.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Configure environment (optional):**
```bash
cp .env.example .env
# Edit .env with your OpenAI API key for real AI functionality
```

3. **Start development server:**
```bash
npm run dev
```

4. **Build for production:**
```bash
npm run build
```

## 🔧 Configuration

### AI Integration
- **With API Key**: Real OpenAI GPT-3.5 Turbo integration
- **Without API Key**: Mock mode with simulated responses
- **Dynamic Config**: Set API key via environment or in-app settings

### Environment Variables
```bash
VITE_OPENAI_API_KEY=sk-your-key-here  # Optional: For real AI
VITE_APP_NAME="Your App Name"         # Optional: Custom branding
VITE_DEV_MODE=true                    # Optional: Development features
```

## 🎯 Features

- **Unlimited AI Chat**: No restrictions on message count
- **Real-time AI Integration**: OpenAI GPT-3.5 Turbo support
- **Mock Mode**: Works without API key for testing
- **Auto-updates**: Configurable update system
- **Responsive Design**: Works on all devices
- **Authentication**: Secure login system
- **Multi-panel Interface**: Chat, Build, Preview, Settings

## 🔐 Default Login
- **Username**: `S_D_CoMpUtEr`
- **Password**: `Qwertypoiu@1`

## 📦 Deployment

### Static Hosting (Recommended)
```bash
npm run build
# Deploy the 'dist' folder to any static hosting service
```

### Supported Platforms
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

### Production Checklist
- ✅ Terser minification configured
- ✅ Environment variables set
- ✅ Build optimization enabled
- ✅ Error handling implemented
- ✅ Responsive design tested
- ✅ Authentication secured

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Architecture
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: React Context + Hooks
- **Routing**: React Router v6
- **Build**: Vite + Terser
- **AI**: OpenAI API integration

## 🔍 Troubleshooting

### Build Issues
- Ensure Node.js 18+ is installed
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check for TypeScript errors: `npm run lint`

### AI Not Working
- Verify VITE_OPENAI_API_KEY in environment
- Check API key validity at OpenAI dashboard
- App works in mock mode without API key

## 📄 License

MIT License - feel free to use for any purpose.

## 🎮 About Ramzi Arcade

Built with ❤️ for unlimited creative possibilities.