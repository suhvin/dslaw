import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDoiME2BcwgU9VDbyyJhWV2n1Og1FzM694",
  authDomain: "dslaw-13409.firebaseapp.com",
  projectId: "dslaw-13409",
  storageBucket: "dslaw-13409.appspot.com",
  messagingSenderId: "82739642619",
  appId: "1:82739642619:web:9d4d6b4195b349bf3d705e",
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();

const app = initializeApp(firebaseConfig);

export default firebase;
