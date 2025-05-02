// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAOiyFxv5P8AT4omMclZpxu8iJbE1AdE1w",
  authDomain: "jvegachatbot.firebaseapp.com",
  projectId: "jvegachatbot",
  storageBucket: "jvegachatbot.firebasestorage.app",
  messagingSenderId: "1026857207115",
  appId: "1:1026857207115:web:96f3c6edfe859e0bf054ce",
  measurementId: "G-G3KG58TXR5"
};

// Inicializa la app una sola vez
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Analytics solo en navegador y si es compatible
const analytics = typeof window !== "undefined" ? isSupported().then(ok => ok ? getAnalytics(app) : null) : null;

export { app, analytics };
