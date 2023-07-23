import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6A8TCTRcBq5UyWUsA6EkOGSy9abOKekk",
  authDomain: "hadaptutoring.firebaseapp.com",
  projectId: "hadaptutoring",
  storageBucket: "hadaptutoring.appspot.com",
  messagingSenderId: "538341169677",
  appId: "1:538341169677:web:93282b5fcd50fc24ad5344",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const firestore = getFirestore(app);

// Enable persistence
setPersistence(auth, browserLocalPersistence);

export { auth };
export const googleprovider = new GoogleAuthProvider();
