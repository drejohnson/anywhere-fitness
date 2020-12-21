import type { NowRequest, NowResponse } from '@vercel/node'
import { Client, query as q } from 'faunadb'
import admin from '../lib/firebase/admin'

export type FaunaToken = {
  secret: string
  instance: {
    id: string
  }
}

const client = new Client({
  secret: process.env.FAUNADB_SERVER_SECRET!,
});

export const handler = async (req: NowRequest, res: NowResponse) => {
  const { email } = req.body
  console.log('email', email)
  try {
    const user = await admin.auth().getUserByEmail(email)
    if (!user)
      return res.status(404).send({ message: 'User not found!'})

    const currentCustomClaims = user.customClaims;
    if (!currentCustomClaims?.['https://fauna.com/user_metadata'])
      return res.status(404).send({ message: 'No FaunaDB user metadata found!'})
    
    const { secret, role } = currentCustomClaims['https://fauna.com/user_metadata']
    const faunaToken: FaunaToken = await client.query(
      q.Call(q.Function("refresh_token"), [secret, user.email!])
    )
    if (!faunaToken)
      return res.status(400).send({ message: 'Error refreshing FaunaDB token!'})

    // console.log('token', faunaToken)
    await admin.auth().setCustomUserClaims(user.uid, {
      'https://fauna.com/user_metadata': {
        'secret': faunaToken.secret,
        'user_id': faunaToken.instance.id,
        ...role
      }
    })

    return res.status(200).send({ status: 'success' })
  } catch (error) {
    console.log(error)
  }
}

export default handler