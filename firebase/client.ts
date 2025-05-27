// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0wHpGOfuXHIaEa4lUyOdSOXm7Fpzuo88",
  authDomain: "intervue-eefbe.firebaseapp.com",
  projectId: "intervue-eefbe",
  storageBucket: "intervue-eefbe.firebasestorage.app",
  messagingSenderId: "430214231259",
  appId: "1:430214231259:web:ce481ec66dc2aadd03c8fe",
  measurementId: "G-FBQEX2YBM8"
};

// Initialize Firebase
const app =!getApps.length? initializeApp(firebaseConfig):getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);