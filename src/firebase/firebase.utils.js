import firebase from "firebase/app";
import "firebase/firestore"; // database
import "firebase/auth"; // authentication

const config = {
  apiKey: "AIzaSyChZo_L3Tw_pZpdoKFwopbODVaMiU183YE",
  authDomain: "crwn-db-4a397.firebaseapp.com",
  databaseURL: "https://crwn-db-4a397.firebaseio.com",
  projectId: "crwn-db-4a397",
  storageBucket: "crwn-db-4a397.appspot.com",
  messagingSenderId: "152465336586",
  appId: "1:152465336586:web:6b6e7539ac4a7af497f2f3",
  measurementId: "G-FPNEFQKG92"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
