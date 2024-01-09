// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6QAiG1M9jcmlidvHBPL8fZocb2S8Ia48",
  authDomain: "jili0-react-project.firebaseapp.com",
  projectId: "jili0-react-project",
  storageBucket: "jili0-react-project.appspot.com",
  messagingSenderId: "1067526600287",
  appId: "1:1067526600287:web:7fece1f469faec016e0dea",
  measurementId: "G-FJKCTSMY82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const myCollection = collection(db, "collection")