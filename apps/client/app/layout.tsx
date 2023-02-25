'use client'

import { urqlClient } from 'integrations/urql'
import { Provider } from 'urql'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { brandingTheme } from 'theme'
import Auth from './Auth'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider value={urqlClient}>
          <Auth>
            <ThemeProvider theme={brandingTheme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </Auth>
        </Provider>
      </body>
    </html>
  )
}

export const metadata = {
  title: 'new metadata',
}
