import { Context } from "@components/Layout"
import { useContext } from "react"

export const useUser = () => {
  const user = useContext(Context)

  return user
}