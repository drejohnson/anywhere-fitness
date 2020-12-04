import admin from './firebase/admin'
import type { NowApiHandler, NowRequest, NowResponse } from '@vercel/node'

export interface RequestWithDecodedIdToken extends NowRequest {
  currentUser: admin.auth.DecodedIdToken
}

type DecodedToken = admin.auth.DecodedIdToken

type ApiHandler = (fn: NowApiHandler) => NowApiHandler | ((req: Request, res: NowResponse) => void)

export async function verifyToken(token: string): Promise<DecodedToken> {
  const decodedToken = await admin.auth().verifyIdToken(token);
  return decodedToken
}

export async function verifyAuthHeader(authHeader: string): Promise<DecodedToken> {
  const [tokenType, token] = authHeader.split(" ");
  if (tokenType !== "Bearer")
    throw new Error("Token type is not Bearer");

  if (token === null)
    throw new Error("Token not passed");

  return await verifyToken(token);
}

export const authMiddleware = (fn: (req: RequestWithDecodedIdToken, res: NowResponse) => Promise<NowResponse>) => async (req: NowRequest, res: NowResponse) => {
  const authorization = req.headers?.authorization;

  try {
    const decodedToken = await verifyAuthHeader(authorization as string);
    (req as RequestWithDecodedIdToken).currentUser = decodedToken;
    return await fn(req as RequestWithDecodedIdToken, res)
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Invalid authorization token" });
  }
}