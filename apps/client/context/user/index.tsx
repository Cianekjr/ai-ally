import { createContext, FC, ReactNode, useCallback, useEffect, useState } from 'react'
import { useGetProfileQuery } from '__generated__/graphql.client'

export interface User {
  id: number | null
  email: string | null
  isUserLoggedIn: boolean
  isFetched: boolean
}

export type UserContextType = {
  user: User
  updateUser: (user: User) => void
  removeUser: () => void
}

export const UserContext = createContext<UserContextType>({
  user: {
    id: null,
    email: null,
    isUserLoggedIn: false,
    isFetched: false,
  },
  updateUser: () => ({}),
  removeUser: () => ({}),
})

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    id: null,
    email: null,
    isUserLoggedIn: false,
    isFetched: false,
  })

  const updateUser = useCallback((newUser: User) => {
    setUser(newUser)
  }, [])

  const removeUser = useCallback(() => {
    setUser({
      id: null,
      email: null,
      isUserLoggedIn: false,
      isFetched: true,
    })
  }, [])

  const [{ data, fetching }] = useGetProfileQuery()

  useEffect(() => {
    if (fetching) return

    if (data?.getProfile) {
      const profile = data?.getProfile
      setUser({
        id: profile.id,
        email: profile.email,
        isUserLoggedIn: true,
        isFetched: true,
      })
    } else {
      setUser({
        id: null,
        email: null,
        isUserLoggedIn: false,
        isFetched: true,
      })
    }
  }, [data?.getProfile, fetching])

  return <UserContext.Provider value={{ user, updateUser, removeUser }}>{children}</UserContext.Provider>
}
