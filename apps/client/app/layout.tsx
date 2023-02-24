'use client'

import { urqlClient } from 'integrations/urql'
import { Provider } from 'urql'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { brandingTheme } from 'theme'
import Globals from '@components/Globals'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <body>
          <Provider value={urqlClient}>
            <Globals>
              <ThemeProvider theme={brandingTheme}>
                <CssBaseline />
                {children}
              </ThemeProvider>
            </Globals>
          </Provider>
        </body>
      </html>
  );
}

export const metadata = {
  title: 'new metadata'
}