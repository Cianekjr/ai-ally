import type { AppProps } from 'next/app'

import { urqlClient } from 'integrations/urql'
import { ReactNode } from 'react'
import { Provider } from 'urql'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { brandingTheme } from 'theme'

export default function App ({
  Component,
  pageProps,
}: AppProps): ReactNode {
  return (
    <Provider value={urqlClient}>
      <ThemeProvider theme={brandingTheme}>
        <CssBaseline />
        <Component {...pageProps} />

      </ThemeProvider>
    </Provider>
  )
}
