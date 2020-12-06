  
import { from, forkJoin, ReplaySubject } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import type firebase from 'firebase'
import { user } from 'rxfire/auth'
import { writable } from 'svelte/store';
import type { Auth, User } from '../types'
import { Status } from '../types'
import { navigate } from 'svelte-navigator';

const config = {
  apiKey: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_APP_ID,
  measurementId: import.meta.env.SNOWPACK_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const userMapper = (claims: User) => ({
  uid: claims.user_id,
  name: claims.name,
  email: claims.email,
  picture: claims.picture
});

export const authStore = writable<Auth>({ status: Status.NOT_AUTHENTICATED })

function lazyLoad() {
  const app$ = from(import('firebase/app'))
  const auth$ = from(import('firebase/auth'))
  return forkJoin([app$, auth$]).pipe(
    map(([firebase$]) => {
      const firebase = firebase$.default
      if (!firebase.apps.length) firebase.initializeApp(config)
      return {firebase}
    }),
  )
}

export const firebaseApp$ = new ReplaySubject<{firebase: typeof firebase}>(1)

lazyLoad()
  .pipe(
    tap(app => {
      const { firebase } = app
      // firebase.auth().onIdTokenChanged(async user => {
      //   authStore.set({ status: Status.AUTHENTICATING })
      //   const tokenResult = await user?.getIdTokenResult();
      //   tokenResult ?
      //     authStore.set({ 
      //       status: Status.AUTHENTICATED, 
      //       token: tokenResult.token, 
      //       user: userMapper(tokenResult.claims as User) 
      //     }) : authStore.set({ status: Status.NOT_AUTHENTICATED })
      // })
      user(firebase.auth()).subscribe(async user => {
        const tokenResult = await user?.getIdTokenResult();
        if (tokenResult) {
          console.log(tokenResult.claims["https://fauna.com/user_metadata"])
          authStore.set({ 
            status: Status.AUTHENTICATED, 
            token: tokenResult.token, 
            user: userMapper(tokenResult.claims as User) 
          })
          navigate('/user/profile', {replace: true})
        }
        else {
          authStore.set({ status: Status.NOT_AUTHENTICATED })
          navigate('/auth/client/login', {replace: true})
        }
      })
    }),
  )
  .subscribe(app => {
    firebaseApp$.next(app)
  })

firebaseApp$.asObservable()

export const createUserWithEmailAndPassword = (email: string, password: string) => {
  firebaseApp$.subscribe(async ({firebase}) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
  })
}

export const loginWithEmailPassword = (email: string, password: string) => {
  firebaseApp$.subscribe(({firebase}) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
  })
}

export const loginWithGoogle = (useRedirect = false) => {
  firebaseApp$.subscribe(async ({firebase}) => {
    const authProvider = new firebase.auth.GoogleAuthProvider()
    useRedirect
      ? await firebase.auth().signInWithRedirect(authProvider)
      : await firebase.auth().signInWithPopup(authProvider)
  })
};

export const logout = () => 
  firebaseApp$.subscribe(async ({firebase}) => {
    await firebase.auth().signOut()
    authStore.set({ status: Status.NOT_AUTHENTICATED })
  })


