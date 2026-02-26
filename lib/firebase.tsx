// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYFdVyHiFTrxuFIsObged5rgrl4L7DsYo",
  authDomain: "blog-24f6d.firebaseapp.com",
  projectId: "blog-24f6d",
  storageBucket: "blog-24f6d.firebasestorage.app",
  messagingSenderId: "735197745886",
  appId: "1:735197745886:web:90d90b41033c5dd4e3e84f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();