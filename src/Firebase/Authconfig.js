// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRV4C2r-zlVktf4U7P2YPZJqYNYSmGRT4",
  authDomain: "fir-job-4414a.firebaseapp.com",
  projectId: "fir-job-4414a",
  storageBucket: "fir-job-4414a.firebasestorage.app",
  messagingSenderId: "377141270741",
  appId: "1:377141270741:web:38b103b27be1928669ea5c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);