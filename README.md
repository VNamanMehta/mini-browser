# Mini Browser

> A lightweight web browser built with Electron, React, TypeScript, and Vite

## 🚀 Features

- **Multiple Tabs**: Open, switch between, and close multiple tabs
- **Navigation Controls**: Back, forward and refresh buttons
- **Smart Address Bar**: Enter URLs or search directly from the address bar
- **Tab Management**: Add new tabs with + button, close tabs with × button
- **Dynamic Tab Titles**: Tab titles update automatically based on page content
- **Modern UI**: Clean, dark-themed interface with smooth animations
- **Keyboard Navigation**: Press Enter in address bar to navigate

## 🛠️ Tech Stack

- **Electron** - Desktop application framework
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn

## 🔧 Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/mini-browser.git
cd mini-browser

# Install dependencies
npm install
```

## 🚀 Development
```bash
# Run in development mode
npm run electron:dev
```

This will:
1. Start the Vite dev server
2. Compile TypeScript for Electron
3. Launch the Electron app with hot reload

## 📦 Build
```bash
# Build for production
npm run electron:build
```

The distributable will be created in the `dist` folder.

## 📁 Project Structure
```
mini-browser/
├── electron/
│   ├── main.ts          # Electron main process
│   ├── preload.ts       # Preload script
│   └── tsconfig.json    # TypeScript config for Electron
├── src/
│   ├── types/
│   │   └── index.ts     # TypeScript interfaces
│   ├── App.tsx          # Main React component
│   ├── App.css          # Component styles
│   ├── index.css        # Global styles
│   └── main.tsx         # React entry point
├── package.json
├── tsconfig.json        # TypeScript config for React
└── vite.config.ts       # Vite configuration
```

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build React app for production |
| `npm run build:electron` | Compile Electron TypeScript |
| `npm run electron:dev` | Run app in development mode |
| `npm run electron:build` | Build production executable |
| `npm run lint` | Run ESLint |

---

Built with ❤️ using Electron + React + TypeScript + Vite
