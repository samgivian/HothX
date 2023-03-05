import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDKaiK2UWx9kXFVTt0LShsIL0DObleIzcw",
  authDomain: "hackhill-b5c62.firebaseapp.com",
  databaseURL: "https://hackhill-b5c62-default-rtdb.firebaseio.com",
  projectId: "hackhill-b5c62",
  storageBucket: "hackhill-b5c62.appspot.com",
  messagingSenderId: "1011777628241",
  appId: "1:1011777628241:web:0107c13c2be3fe57be3070",
  measurementId: "G-44KH16YWY2",
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKaiK2UWx9kXFVTt0LShsIL0DObleIzcw",
  authDomain: "hackhill-b5c62.firebaseapp.com",
  databaseURL: "https://hackhill-b5c62-default-rtdb.firebaseio.com",
  projectId: "hackhill-b5c62",
  storageBucket: "hackhill-b5c62.appspot.com",
  messagingSenderId: "1011777628241",
  appId: "1:1011777628241:web:0107c13c2be3fe57be3070",
  measurementId: "G-44KH16YWY2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);*/
