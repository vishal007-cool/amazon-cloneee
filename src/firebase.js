// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAi4ZMaYrs0skxk17q2nJnPONSOXNxtBg",
  authDomain: "chating-app-8e76d.firebaseapp.com",
  projectId: "chating-app-8e76d",
  storageBucket: "chating-app-8e76d.firebasestorage.app",
  messagingSenderId: "191947733126",
  appId: "1:191947733126:web:eabb0ee1808831eec7f907",
  measurementId: "G-8FR7YW1FN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);