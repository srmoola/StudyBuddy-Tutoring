import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, googleprovider, firestore } from "../firebase";

const userListRef = collection(firestore, "Users");

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleprovider);
    await addDoc(userListRef, {
      userEmail: auth.currentUser?.email,
      photoUrl: auth.currentUser?.photoURL,
      name: auth.currentUser?.displayName,
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    console.error(err);
  }
  window.location.reload();
};

export const signInDisplayName = async (displayName: string) => {
  try {
    let email: string = displayName;
    email = email.replace(/\s/g, "") + "@" + crypto.randomUUID() + ".com";
    await createUserWithEmailAndPassword(auth, email, crypto.randomUUID());
  } catch (err) {
    console.error(err);
  }
  window.location.reload();
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
  }
  window.location.reload();
};
