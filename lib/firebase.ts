import admin from './firebase/admin'
import type { NowApiHandler, NowRequest, NowResponse } from '@vercel/node'

export interface Request extends NowRequest {
  currentUser: admin.auth.DecodedIdToken
}

export type Credentials = {
  secret: string
  instance: {
    id: string
  }
}

interface Claims {
  [key:string]: {
    [key:string]: string
  }
}

type ApiHandler = (fn: NowApiHandler) => NowApiHandler | ((req: Request, res: NowResponse) => void)

const getClaims: (credentails: Credentials) => Claims = (credentails) => ({
  'https://fauna.com/user_metadata': {
    'secret': credentails.secret,
    'user_id': credentails.instance.id,
  }
})

export const authenticateUser = async (user: admin.auth.UserRecord) => {
  let user_from_fauna = {
    secret: "",
    instance: {
      id: ""
    }
  };
  if (user.uid) {
    const customClaims = getClaims(user_from_fauna)
    await admin.auth().setCustomUserClaims(user.uid, customClaims)
    return user
  } else {
    throw new Error('Error authenticating firebase user')
  }
}

export const createUser = async ({ email, password } : {email: string, password: string}) => {
  const user = await admin.auth().createUser({
    email,
    password
  })

  if (user.uid) {
    const customClaims = getClaims(user as any)
    await admin.auth().setCustomUserClaims(user.uid, customClaims)
    return user
  } else {
    throw new Error('Error creating firebase user')
  }
}

