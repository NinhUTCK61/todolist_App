// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY1qcrc4oT2_OJjb39jvGnupXv94T1WSM",
  authDomain: "todolist-7ce5a.firebaseapp.com",
  projectId: "todolist-7ce5a",
  storageBucket: "todolist-7ce5a.appspot.com",
  messagingSenderId: "369620205588",
  appId: "1:369620205588:web:85af17b14e2579ef50a701",
  measurementId: "G-D46QXFNZ73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}

