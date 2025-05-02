// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOiyFxv5P8AT4omMclZpxu8iJbE1AdE1w",
  authDomain: "jvegachatbot.firebaseapp.com",
  projectId: "jvegachatbot",
  storageBucket: "jvegachatbot.appspot.com",
  messagingSenderId: "1026857207115",
  appId: "1:1026857207115:web:96f3c6edfe859e0bf054ce",
  measurementId: "G-G3KG58TXR5"
};

// Inicializar Firebase solo una vez
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
