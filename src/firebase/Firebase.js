// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

//-------------------------------------------------------------------------------

//---------------------------------------------------------------------------
//import db from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkzXxpk-vZICBNUjeOSDY_59gAN9V6cuI",
  authDomain: "tss-db-e1729.firebaseapp.com",
  projectId: "tss-db-e1729",
  storageBucket: "tss-db-e1729.appspot.com",
  messagingSenderId: "1077439325934",
  appId: "1:1077439325934:web:a9d95e54ac2dc6f7cc75ff",
  measurementId: "G-0X2N0B8T3Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
//--------------------------------------------------

//------------------------------------------------
export default app;
