import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDQR1MEg9kL-F60az3dLH-GGsdRY6zRpYM",
	authDomain: "insta-clone3-ae735.firebaseapp.com",
	projectId: "insta-clone3-ae735",
	storageBucket: "insta-clone3-ae735.appspot.com",
	messagingSenderId: "616651471500",
	appId: "1:616651471500:web:31473d11ff0475cb8659a9",
	measurementId: "G-ZGBZ8LQV22"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
