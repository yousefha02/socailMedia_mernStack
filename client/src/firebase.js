import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyC-TLc2KA4qhrDSxWGigiSre5Ud271RNRw",
    authDomain: "social-8cc84.firebaseapp.com",
    projectId: "social-8cc84",
    storageBucket: "social-8cc84.appspot.com",
    messagingSenderId: "905999684881",
    appId: "1:905999684881:web:b860fa537c2fee234da8b0",
    measurementId: "G-GH57BXJJL2"
};
  
const app = initializeApp(firebaseConfig);
export const db = getFirestore();




