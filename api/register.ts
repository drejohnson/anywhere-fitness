import admin from '../lib/firebase/admin'
import type { NowRequest, NowResponse } from '@vercel/node'

export type FaunaToken = {
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

const getClaims: (faunaToken: FaunaToken) => Claims = (faunaToken) => ({
  'https://fauna.com/user_metadata': {
    'secret': faunaToken.secret,
    'user_id': faunaToken.instance.id,
  }
})

const create = async (req: NowRequest, res: NowResponse) => {
  let user_from_fauna = {
    secret: "",
    instance: {
      id: ""
    }
  };
  try {
    const { password, email } = req.body

    if (!email || !password) {
      return res.status(400).send({ message: 'Missing fields' })
    }

    const { uid } = await admin.auth().createUser({
        password,
        email
    })

    const customClaims = getClaims(user_from_fauna)

    await admin.auth().setCustomUserClaims(uid, customClaims)

    return res.status(201).send({ uid })
  } catch (error) {
    console.log(error)
      // return handleError(res, err)
  }
}

export default create