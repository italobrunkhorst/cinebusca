// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCziuCm2Mxlh8TxQbcGUV9ogfNSek1OKxc",
    authDomain: "cinebusca-3c209.firebaseapp.com",
    projectId: "cinebusca-3c209",
    storageBucket: "cinebusca-3c209.firebasestorage.app",
    messagingSenderId: "64159991196",
    appId: "1:64159991196:web:3345ba66323a15abe9f459",
    measurementId: "G-QTEGDZTWDG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
// Exportando o Firestore
const auth = getAuth(app);
const db = getFirestore(app);
export { auth ,db };