interface ResultArgs {
  fetchError?: unknown 
  httpError?: unknown 
  graphQLErrors?: unknown[]
  data?: unknown
}

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
    const response = await fetch('https://your-endpoint.herokuapp.com/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'hasura secret',
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

export const gql = (strings: string[]) => {
  return strings.join("");
};