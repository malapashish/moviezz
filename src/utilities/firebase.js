import firebase from 'firebase';
require("firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyAxOkPTbxh6rnKKdgNfAwuEsFTC1tLL16U",
    authDomain: "moviezz-dc427.firebaseapp.com",
    projectId: "moviezz-dc427",
    storageBucket: "moviezz-dc427.appspot.com",
    messagingSenderId: "436771157942",
    appId: "1:436771157942:web:5abb9b61eee606df0f3317"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
export default db;