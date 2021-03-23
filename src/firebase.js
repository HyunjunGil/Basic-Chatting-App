import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAGfPAbDT5ZCXx7F00B7G3Rtbn-TRLb7vI",
  authDomain: "test-03-19-2021.firebaseapp.com",
  projectId: "test-03-19-2021",
  storageBucket: "test-03-19-2021.appspot.com",
  messagingSenderId: "381856068644",
  appId: "1:381856068644:web:082fd6317bfe206c4354b1"
});

const db = firebaseApp.firestore();

export {db, firebaseApp};