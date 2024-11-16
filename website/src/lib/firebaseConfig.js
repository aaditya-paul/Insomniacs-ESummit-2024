import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5Y5WTDwGnAPkRVQp4E0AxX5dE0790-Bc",
  authDomain: "insomniacs-86649.firebaseapp.com",
  projectId: "insomniacs-86649",
  storageBucket: "insomniacs-86649.firebasestorage.app",
  messagingSenderId: "1078521509612",
  appId: "1:1078521509612:web:85119204d40899edd917c9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
