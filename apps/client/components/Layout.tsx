'use client'

import { FC, ReactNode } from 'react'

import { Box, BoxProps, Container } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Header } from 'components/Header'
import { HEADER_HEIGHT } from 'utils/styles'

interface LayoutProps {
  children: ReactNode
  boxProps?: BoxProps
}

const Layout: FC<LayoutProps> = ({ children, boxProps }) => {
  return (
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
  )
}

export default Layout
