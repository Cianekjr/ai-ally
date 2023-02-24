'use client'

import { FC, ReactNode } from 'react'

import { Box, BoxProps, Container } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useGetProfileQuery } from '__generated__/graphql.client'

    import { Header } from 'components/Header'
    import { HEADER_HEIGHT } from 'utils/styles'

interface GlobalsProps {
  children: ReactNode
  boxProps?: BoxProps
}

const initialState: { id: number | null, email: string | null, isUserLoggedIn: boolean, isFetched: boolean} = {
  id: null,
  email: null,
  isUserLoggedIn: false,
  isFetched: false
}
// export const Context = createContext(initialState)

const Globals: FC<GlobalsProps> = ({ children, boxProps }) => {
  // const [{ data, fetching, error }] = useGetProfileQuery()
  console.count('dwaawddaw')

  // const isTokenExpired = error?.message.includes('Token expired')
  // const user = data?.getProfile

  return (
    // <Context.Provider value={{ id: user?.id ?? null, email: user?.email || null, isUserLoggedIn: !!user?.email || false, isFetched: !fetching && !isTokenExpired }}>
    <div>

          {children}
    </div>
    // </Context.Provider>
  )
}

export default Globals
