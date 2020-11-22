import { get } from 'svelte/store'
import { auth } from '../stores/auth'

interface ResultArgs {
  fetchError?: unknown 
  httpError?: unknown 
  graphQLErrors?: unknown[]
  data?: unknown
}

const { 
  SNOWPACK_PUBLIC_GRAPHQL_ENDPOINT, 
  SNOWPACK_PUBLIC_FAUNADB_SECRET 
} = import.meta.env;

export const request = async (query: string, variables?: unknown) => {
  const handleResult = ({ fetchError, httpError, graphQLErrors, data }: ResultArgs) => {
    const error = !!(
      (graphQLErrors && graphQLErrors.length > 0) ||
      fetchError ||
      httpError
    )

    return {
      error,
      fetchError,
      httpError,
      graphQLErrors,
      data
    }
  }

  try {
    const token = get(auth).token || SNOWPACK_PUBLIC_FAUNADB_SECRET
    console.log(get(auth).token)
    const response = await fetch(SNOWPACK_PUBLIC_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
    if (!response.ok) {
      const body = await response.json()
      const { status, statusText } = body
      return handleResult({
        httpError: {
          status,
          statusText,
          body
        }
      })
    } else {
      const { data, errors } = await response.json()
      return handleResult({
        graphQLErrors: errors,
        data
      })
    }
  } catch (error) {
    console.log(error)
    handleResult({
      fetchError: error
    })
  }
}

export const gql = (strings: TemplateStringsArray) => {
  return strings.join("");
};