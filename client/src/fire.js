import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "pmsapp-fdb77.firebaseapp.com",
  databaseURL: "https://pmsapp-fdb77.firebaseio.com",
  projectId: "pmsapp-fdb77",
  storageBucket: "pmsapp-fdb77.appspot.com",
  messagingSenderId: "612743028167",
  appId: "1:612743028167:web:8c092392c01b0f8900cde2",
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
