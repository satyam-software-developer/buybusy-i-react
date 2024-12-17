// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxygaO6D_H1sGkm9C2fZ00mpo4VA1GZH8",
  authDomain: "buybusy-ad272.firebaseapp.com",
  projectId: "buybusy-ad272",
  storageBucket: "buybusy-ad272.appspot.com",
  messagingSenderId: "260481780408",
  appId: "1:260481780408:web:ea25419e9b8c23beb4024d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);



