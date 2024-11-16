// Import the functions you need from the SDKs you need
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRJU_-XzyDgXH-ZlGVelF02G3QOYNA1zQ",
  authDomain: "smart-architecture-78637.firebaseapp.com",
  databaseURL: "https://smart-architecture-78637-default-rtdb.firebaseio.com",
  projectId: "smart-architecture-78637",
  storageBucket: "smart-architecture-78637.firebasestorage.app",
  messagingSenderId: "443024922805",
  appId: "1:443024922805:web:b5b2d24e6eb307265146fc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

