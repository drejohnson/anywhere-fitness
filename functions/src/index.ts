import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import { Client, query as q } from 'faunadb'
import type { UserRecord } from 'firebase-functions/lib/providers/auth';

interface FaunaToken {
  secret: string
  instance: {
    id: string
  }
}

interface Claims {
  secret: string
  user_id: string
}

admin.initializeApp()

const client = new Client({
  secret: functions.config().fauna.server_key,
});

const setCustomUserClaims = async (user: UserRecord): Promise<void> => {
  try {
    /* create a secret from the user's ref in the Tokens collection */
    
    const faunaToken: FaunaToken = await client.query(
      q.Call(q.Function("create_user"), [user.email as string])
    );

    if (!faunaToken)
      throw new Error('Error creating FaunaDB token')

    if (user.uid)
      return await admin.auth().setCustomUserClaims(user.uid, {
        'https://fauna.com/user_metadata': {
          'secret': faunaToken.secret,
          'user_id': faunaToken.instance.id,
          'role': {
            'client': true,
            'instructor': false,
            'admin': false
          }
        }
      })

  } catch (error) {
    throw new Error('Error creating firebase user')
  }
}

export const onCreate = functions.auth.user().onCreate(async user => {
  try {
    return await setCustomUserClaims(user)
  } catch (error) {
    console.log(error)
    throw new Error('onCreate function failed')
  }
})

export const onDelete = functions.auth.user().onDelete(async user => {
  try {
    const currentCustomClaims = user.customClaims;
    const { user_id, secret } = currentCustomClaims?.["https://fauna.com/user_metadata"] as Claims
    return await client.query(
      q.Do(
        q.Call(
          q.Function("delete_token"),
          secret
        ),
        q.Call(
          q.Function("delete_user"),
          user_id
        )
      )
    )
  } catch (error) {
    console.log(error)
    throw new Error('onDelete function failed')
  }
})
