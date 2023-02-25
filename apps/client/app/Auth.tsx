'use client'

import { createContext, FC, ReactNode } from 'react'
import { useGetProfileQuery } from '__generated__/graphql.client'

interface AuthProps {
  children: ReactNode
}

const initialState: { id: number | null; email: string | null; isUserLoggedIn: boolean; isFetched: boolean } = {
  id: null,
  email: null,
  isUserLoggedIn: false,
  isFetched: false,
}
export const UserContext = createContext(initialState)

const Auth: FC<AuthProps> = ({ children }) => {
  const [{ data, fetching }] = useGetProfileQuery()

  const user = data?.getProfile

  return (
    <UserContext.Provider value={{ id: user?.id ?? null, email: user?.email || null, isUserLoggedIn: !!user?.email || false, isFetched: !fetching }}>
      {children}
    </UserContext.Provider>
  )
}

export default Auth
