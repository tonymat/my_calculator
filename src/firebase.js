// Firebase configuration placeholder – replace with your actual config values
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApBrCi1lgoG4A8AAhvsJnu5_jduwyx5hY",
    authDomain: "cal1-9da18.firebaseapp.com",
    projectId: "cal1-9da18",
    storageBucket: "cal1-9da18.firebasestorage.app",
    messagingSenderId: "744329752072",
    appId: "1:744329752072:web:829e1b41b942502952ebbd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
