
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//     apiKey: "AIzaSyDsliqSMuEPyG-O00qSrl3t0KghnPRABeE",
//     authDomain: "podcast-rbl-61b7e.firebaseapp.com",
//     projectId: "podcast-rbl-61b7e",
//     storageBucket: "podcast-rbl-61b7e.appspot.com",
//     messagingSenderId: "738638791863",
//     appId: "1:738638791863:web:c82847e9f8682f8d27b932"
// };
const firebaseConfig = {
    apiKey: "AIzaSyAPNXIb0WqbsusfE_AwE68z1HkJOzR7QHM",
    authDomain: "hackethon-podecast.firebaseapp.com",
    projectId: "hackethon-podecast",
    storageBucket: "hackethon-podecast.appspot.com",
    messagingSenderId: "1041153476189",
    appId: "1:1041153476189:web:e4e0df144e35b922346fb4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()
