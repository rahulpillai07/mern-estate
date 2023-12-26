// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:"AIzaSyB5YHhMoveRZ8LB-mgeogTqBY7ya1PH24k",
  authDomain: "mern-estate-53120.firebaseapp.com",
  projectId: "mern-estate-53120",
  storageBucket: "mern-estate-53120.appspot.com",
  messagingSenderId: "821243324123",
  appId: "1:821243324123:web:0bf1db66290d5fac6fcefe",
  measurementId: "G-MGFCT59E23"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);