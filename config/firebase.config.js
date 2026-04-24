// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyA0VIEUqCfcZFDnvu-UP_uzEvIEfcaLJqg",
  authDomain: "skillxchanger-4ceb6.firebaseapp.com",
  projectId: "skillxchanger-4ceb6",
  storageBucket: "skillxchanger-4ceb6.firebasestorage.app",
  messagingSenderId: "795526380051",
  appId: "1:795526380051:web:4ea310559e8adde6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db };
