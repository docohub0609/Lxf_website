// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBv0lF85WhhvkbFxblSc8_4UMsof43I8rI",
    authDomain: "lxf-website.firebaseapp.com",
    projectId: "lxf-website",
    storageBucket: "lxf-website.firebasestorage.app",
    messagingSenderId: "444253952695",
    appId: "1:444253952695:web:6441873033896a30414b32",
    measurementId: "G-PCQM5WJDCV"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
