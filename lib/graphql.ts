import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://graphql.fauna.com/graphql';

export const graphQLClient = (token?: string) => {
  const secret = token || process.env.SNOWPACK_PUBLIC_FAUNADB_SECRET || '';

  return new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${secret}`
    }
  });
};