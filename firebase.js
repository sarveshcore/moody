// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

// Initialize Firebase only if we have the required config
let app;
let auth;
let db;

if (firebaseConfig.apiKey && firebaseConfig.projectId) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.error("Error initializing Firebase:", error);
  }
} else {
  console.warn(
    "Firebase configuration is incomplete. Please set the following environment variables:",
    "\n- NEXT_PUBLIC_FIREBASE_API_KEY",
    "\n- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    "\n- NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    "\n- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
    "\n- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    "\n- NEXT_PUBLIC_FIREBASE_APP_ID"
  );
}

export { auth, db };
