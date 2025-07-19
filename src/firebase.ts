// src/firebase.ts

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// import { getAnalytics } from 'firebase/analytics'; // Optional

const firebaseConfig = {
  apiKey: "AIzaSyC6JDm05xBAbuUF-eeIvSRoLzsFpmqGKbM",
  authDomain: "olsas-log.firebaseapp.com",
  projectId: "olsas-log",
  storageBucket: "olsas-log.firebasestorage.app",
  messagingSenderId: "866349040413",
  appId: "1:866349040413:web:e4c157efba76564f5d57f4",
  measurementId: "G-8E89K1SK31"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Optional

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
