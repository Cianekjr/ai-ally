'use client'

import { createContext, FC, ReactNode } from 'react'

import { Box, BoxProps, Container } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useGetProfileQuery } from '__generated__/graphql.client'

import { Header } from 'components/Header'
import { HEADER_HEIGHT } from 'utils/styles'

interface LayoutProps {
  children: ReactNode
  boxProps?: BoxProps
}

const initialState: { id: number | null, email: string | null, isUserLoggedIn: boolean, isFetched: boolean} = {
  id: null,
  email: null,
  isUserLoggedIn: false,
  isFetched: false
}
export const Context = createContext(initialState)

const Layout: FC<LayoutProps> = ({ children, boxProps }) => {
  const [{ data, fetching, error }] = useGetProfileQuery()

  const isTokenExpired = error?.message.includes('expired')
  const user = data?.getProfile

  return (
    <Context.Provider value={{ id: user?.id ?? null, email: user?.email || null, isUserLoggedIn: !!user?.email || false, isFetched: !fetching && !isTokenExpired }}>
      <Box minHeight="100vh" display="flex" flexDirection="column" bgcolor="background.paper" {...boxProps}>
        <Header />
        <Container
          component="main"
          maxWidth="xl"
          sx={{
            position: 'relative',
            minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
            display: 'grid',
          }}
        >
          {children}
        </Container>

        <ToastContainer position="bottom-right" newestOnTop />
      </Box>
    </Context.Provider>
  )
}

export default Layout
