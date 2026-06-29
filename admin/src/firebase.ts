import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiEIIBBId6Yv8S7mlpZOwG1_GUTgnW4zA",
  authDomain: "weatherguard-c429d.firebaseapp.com",
  projectId: "weatherguard-c429d",
  storageBucket: "weatherguard-c429d.firebasestorage.app",
  messagingSenderId: "145444990870",
  appId: "1:145444990870:web:3d25cdeec26f3fbba7f7b7",
  measurementId: "G-7H3HHCDXX7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();