'use client'

import { urqlClient } from 'integrations/urql'
import { Provider } from 'urql'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { brandingTheme } from 'theme'
import { UserProvider } from 'context/user'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider value={urqlClient}>
          <UserProvider>
            <ThemeProvider theme={brandingTheme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </UserProvider>
        </Provider>
      </body>
    </html>
  )
}
