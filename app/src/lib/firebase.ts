// ============================================
// FIREBASE CONFIG - PROYECTO INKAS
// ============================================

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "AIzaSyA6ARSyNmqQizWF4tjSE5Rm_TTjQ7-g8no",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "inkas-4fe33.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "inkas-4fe33",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "inkas-4fe33.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "685659623264",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "1:685659623264:web:26636f11fd77294f1f1805",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

