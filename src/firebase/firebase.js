import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDaWGvh_C2qt5jp1dS5Ebe_ft9H1vN6S9U",
	authDomain: "insta-clone-99f95.firebaseapp.com",
	projectId: "insta-clone-99f95",
	storageBucket: "insta-clone-99f95.appspot.com",
	messagingSenderId: "728605964637",
	appId: "1:728605964637:web:d5668b51f98f95f61290b4",
	measurementId: "G-XSKQ62G75K"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
