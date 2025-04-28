// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-course-generator-b716a.firebaseapp.com",
  projectId: "ai-course-generator-b716a",
  storageBucket: "ai-course-generator-b716a.firebasestorage.app",
  messagingSenderId: "887894539773",
  appId: "1:887894539773:web:5b511236a8bb96b37dad94",
  measurementId: "G-WV81J1Z19F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const storrage = getStorage(app);