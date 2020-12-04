import { authMiddleware, RequestWithDecodedIdToken } from '../lib/auth'
import type { NowRequest, NowResponse } from '@vercel/node'

const handler = async (req: RequestWithDecodedIdToken, res: NowResponse) => {
  // const token = await authCheck(request, response)
  // console.log("request.currentUser", req.currentUser.email)
  return res.status(200).send({message: `Hello ${req.currentUser.email}!`});
}

export default authMiddleware(handler)