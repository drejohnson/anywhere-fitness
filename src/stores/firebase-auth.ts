import firebase from 'firebase/app';
import 'firebase/auth';
import { writable, readable, Readable } from 'svelte/store';

export enum Status {
  AUTHENTICATING = "AUTHENTICATING",
  AUTHENTICATED = "AUTHENTICATED",
  NOT_AUTHENTICATED = "NOT_AUTHENTICATED",
  HAS_ERRORS = "HAS_ERRORS"
}

export interface User {
  user_id: string
  name: string
  email: string
  picture: string
}

interface TokenResult {
  user: Partial<firebase.User>
  token: string
}

export interface Auth {
  status: Status
  user?: Partial<firebase.User>
  token?: string
}

const userMapper = (claims: User) => ({
  uid: claims.user_id,
  name: claims.name,
  email: claims.email,
  picture: claims.picture
});

export const authStore = writable<Auth>({ status: Status.NOT_AUTHENTICATED })

// construction function. need to call it after we
// initialize our firebase app
export const initAuth = (useRedirect = false) => {
  const auth = firebase.auth();

  const createUserWithEmailAndPassword = (email: string, password: string) =>
    auth.createUserWithEmailAndPassword(email, password);

  const loginWithEmailPassword = (email: string, password: string) =>
    auth.signInWithEmailAndPassword(email, password);

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    if (useRedirect) {
      return auth.signInWithRedirect(provider);
    } else {
      return auth.signInWithPopup(provider);
    }
  };

  const logout = () => auth.signOut();

  const asyncTokenResult: Readable<Promise<firebase.auth.IdTokenResult | null>> = readable(new Promise(() => {}), set => {
    const unsub = auth.onIdTokenChanged(async user => {
      console.log(`token changed!`);
      if (!user) {
        console.log(`no token found...`);
        set(Promise.resolve(null));
        return;
      }
      console.log(`updating token...`);
      const tokenResult = await user.getIdTokenResult();
      set(Promise.resolve(tokenResult));
    });

    return unsub;
  })

  // wrap Firebase user in a Svelte readable store
  const tokenResult = readable<TokenResult | null>(null, set => {
    const unsub = auth.onIdTokenChanged(async auth => {
      // console.log(`token changed!`);
      if (!auth) {
        console.log(`no token found...`);
        authStore.set({ status: Status.NOT_AUTHENTICATED });
        set(null);
        return;
      }
      // console.log(`updating token...`);
      const tokenResult = await auth.getIdTokenResult();
      const token = tokenResult.token
      const user = userMapper(tokenResult.claims as User);
      if (user && token)
        authStore.set({ status: Status.AUTHENTICATED, token, user });
      set({
        user,
        token
      });
    });

    return unsub;
  });

  return {
    tokenResult,
    asyncTokenResult,
    loginWithGoogle,
    loginWithEmailPassword,
    createUserWithEmailAndPassword,
    logout
  };
};
