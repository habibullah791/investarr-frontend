// firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBes_tHm3LghBNitcB6fywby_zUouBp87E",
    authDomain: "investarr-8a603.firebaseapp.com",
    projectId: "investarr-8a603",
    storageBucket: "investarr-8a603.appspot.com",
    messagingSenderId: "783657814457",
    appId: "1:783657814457:web:4b40020d6eb9977025ce68",
    measurementId: "G-S1KYTGPVKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
