// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOTZG685E0GZymnIIOMxE-q6ipye2FDFI",
  authDomain: "unity-plate.firebaseapp.com",
  projectId: "unity-plate",
  storageBucket: "unity-plate.appspot.com",
  messagingSenderId: "122729419309",
  appId: "1:122729419309:web:3045144f465c3d8efd5ea4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
