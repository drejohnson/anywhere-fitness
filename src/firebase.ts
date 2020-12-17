import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_APP_ID,
  measurementId: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const useRedirect = false

export const auth = firebase.auth();

export const createUserWithEmailAndPassword = (email: string, password: string) =>
    auth.createUserWithEmailAndPassword(email, password);

export const loginWithEmailPassword = (email:string, password:string) =>
  auth.signInWithEmailAndPassword(email, password);

export const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return useRedirect
    ? auth.signInWithRedirect(provider)
    : auth.signInWithPopup(provider);
};