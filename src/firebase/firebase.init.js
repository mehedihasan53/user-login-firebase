// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC19GGO_grFbQQ8frITXvwPD8v35BBh6zY",
    authDomain: "user-login-firebase-7bfc6.firebaseapp.com",
    projectId: "user-login-firebase-7bfc6",
    storageBucket: "user-login-firebase-7bfc6.firebasestorage.app",
    messagingSenderId: "248052187341",
    appId: "1:248052187341:web:072ba8fdd51e2827852984"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);