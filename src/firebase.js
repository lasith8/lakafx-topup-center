import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJgfMPY9ybHaF0k4RjEG-Kqx67aSzX8tc",
  authDomain: "lakafx-top-up-center.firebaseapp.com",
  projectId: "lakafx-top-up-center",
  storageBucket: "lakafx-top-up-center.firebasestorage.app",
  messagingSenderId: "756408348971",
  appId: "1:756408348971:web:8eee726b915520a617556e",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;