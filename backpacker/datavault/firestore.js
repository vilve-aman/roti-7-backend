// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-gPDBGr2gzBgTWuyYtPA-h-yCDOxijJ4",
  authDomain: "roti-drivers.firebaseapp.com",
  projectId: "roti-drivers",
  storageBucket: "roti-drivers.appspot.com",
  messagingSenderId: "452224600882",
  appId: "1:452224600882:web:38d6c61a4c3d977633652b",
  measurementId: "G-Z0V7F1ESMZ", 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);




export {db, auth, storage}

// release notes
// firestore -> firebase initialization
// auth -> firebase authentication
// hulkStorage -> firebase storage
// starkdb -> firebase document store