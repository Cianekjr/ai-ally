import { createClient, dedupExchange, cacheExchange, fetchExchange, errorExchange, ssrExchange } from '@urql/core'
// import { createClient, dedupExchange, cacheExchange, fetchExchange, errorExchange, ssrExchange } from 'urql'
import { LogoutDocument, LogoutQuery, RegenerateTokensDocument, RegenerateTokensQuery } from '__generated__/graphql.server'

// import { Router } from 'next/router'
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
        // console.log('ERROR', error)
        if (error.message.includes(TOKEN_EXPIRED_MESSAGE)) {
          // Refresh token
          // console.log('REFRESH')
          const { data, error } = await urqlClient.query<RegenerateTokensQuery>(RegenerateTokensDocument, {}, operation.context).toPromise()

          // console.log('REFRESH TOKEN ERROR', error, data, operation)

          if (data?.regenerateTokens === 'ok') {
            urqlClient.reexecuteOperation(operation)
          } else {
            await urqlClient.query<LogoutQuery>(LogoutDocument, {}).toPromise()
          }
        }
      },
    }),
    customSsrExchange,
    fetchExchange,
  ],
})
