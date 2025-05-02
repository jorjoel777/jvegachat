# 🧠 Jorge Vega ChatBot

A modern, AI-powered portfolio chatbot that responds to questions, captures leads, and shows off Jorge Vega’s fullstack capabilities.

## ✨ Tech Stack

- **Next.js 14 (App Router)**
- **TailwindCSS**
- **OpenRouter + GPT-4**
- **Firebase (Firestore for sessions & leads)**
- **React Client Components**

## 💡 Features

- Predefined FAQ answers with natural fallback to GPT-4
- Lead collection via embedded contact form
- Real-time Firebase chat logging
- Responsive UI for desktop and mobile
- GPT-4 integration through OpenRouter API

## 🔐 .env.local Setup

```env
OPENAI_API_KEY=sk-...           # For OpenRouter (or your API key)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...


## 📊 Improvements in progress
- [ ] Enhanced mobile UX
- [ ] Responsive layout for header and form
- [ ] Lead confirmation feedback
- [ ] Analytics integration (optional)

## 📖 Inspiration
This is a real AI engineering prototype crafted with UX in mind, intended to:
- Showcase Jorge Vega's services
- Explore lightweight, AI-enhanced frontends
- Build contact-qualified inbound automation



🚀 Running locally
bash
Copiar
Editar
npm install
npm run dev
Visit http://localhost:3000

📁 Firebase Setup
Create a Firestore database

Add two collections:
chat_sessions (array of message objects)
leads (name, email, phone, message)

Enable anonymous or rules-protected access

🧠 Powered by

OpenRouter
Firebase
Next.js

© 2025 Jorge Vega — Chatbot Portfolio.