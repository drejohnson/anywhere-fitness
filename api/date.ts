import type { NowRequest, NowResponse } from '@vercel/node'

export default (request: NowRequest, response: NowResponse) => {
  const date = new Date().toString();
  response.status(200).send(date);
};