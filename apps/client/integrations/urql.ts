import { createClient, dedupExchange, cacheExchange, fetchExchange, errorExchange, ssrExchange } from 'urql'
import { RegenerateTokensDocument, RegenerateTokensQuery } from '__generated__/graphql.client'

const TOKEN_EXPIRED_MESSAGE = 'Token expired'

const isServerSide = typeof window === 'undefined'

const customSsrExchange = ssrExchange({
  isClient: !isServerSide,
  // @ts-expect-error __URQL_DATA__ is unknown
  initialState: !isServerSide ? window.__URQL_DATA__ : undefined,
})

export const urqlClient = createClient({
  url: process.env.NEXT_PUBLIC_API_URL as string,
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    dedupExchange,
    cacheExchange,
    errorExchange({
      onError: async (error, operation) => {
        if (error.message.includes(TOKEN_EXPIRED_MESSAGE)) {
          // Refresh token
          const { data } = await urqlClient.query<RegenerateTokensQuery>(RegenerateTokensDocument, {}, operation.context).toPromise()

          if (data?.regenerateTokens === 'ok') {
            // Reexecute the operation
            urqlClient.reexecuteOperation(operation)
          }
        }
      },
    }),
    customSsrExchange,
    fetchExchange,
  ],
})
