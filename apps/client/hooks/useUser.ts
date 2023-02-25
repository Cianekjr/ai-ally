import { UserContext } from 'app/Auth'
import { useContext } from 'react'

export const useUser = () => {
  const user = useContext(UserContext)

  return user
}
