// src/services/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCqNvvBvsoB2owMCO2iesIgM-joJCOgC4Q",
  authDomain: "khoj-yatri.firebaseapp.com",
  projectId: "khoj-yatri",
  storageBucket: "khoj-yatri.firebasestorage.app",
  messagingSenderId: "306312757513",
  appId: "1:306312757513:web:80251735b98c65903393d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore instance
export const db = getFirestore(app);
