import type { NowRequest, NowResponse } from '@vercel/node'
import allowCors from '../lib/allowCors'
import { createSession } from '../lib/session'
import { graphQLClient } from '../lib/graphql'
import { handleLoginError } from '../lib/apiErrors'

const login_account_query = `
  mutation loginUser($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password }) {
      access
      refresh
      account {
        email
      }
    }
  }
`;

export const handler = async (req: NowRequest, res: NowResponse) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).send('Email and Password not provided');
  }

  try {
    let result = await graphQLClient(process.env.FAUNA_BOOTSTRAP_KEY).request(login_account_query, {
      email,
      password,
    })

    await createSession(res, { 
      refreshToken: result.refresh.secret, 
      accessToken: result.access.secret, 
      account: result.user
    })

    console.log("login", result)
    res.status(200).send(result)
  } catch (error) {
    handleLoginError(error, res)
  }
}

export default allowCors(handler)