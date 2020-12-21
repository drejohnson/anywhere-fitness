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

const refreshToken = async (userCredentail: firebase.auth.UserCredential) => {
  if (userCredentail.user) {
    const email = userCredentail.user.email

    const res = await fetch('/api/refresh-token', {
      method: 'POST',
      body: JSON.stringify({
        email
      })
    })

    const { status } = await res.json()

    if ( status === 'sucess')
      auth.currentUser?.getIdToken(true);
  }
}

export const createUserWithEmailAndPassword = (email: string, password: string) =>
    auth.createUserWithEmailAndPassword(email, password);

export const loginWithEmailPassword = (email:string, password:string) =>
  auth.signInWithEmailAndPassword(email, password).then(async result => {
    refreshToken(result)
  });

export const loginWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return useRedirect
    ? await auth.signInWithPopup(provider).then(async (result) => {
        refreshToken(result)
      })
    : auth.signInWithRedirect(provider).then(async () => {
        const result = await auth.getRedirectResult()
        refreshToken(result)
    })
};