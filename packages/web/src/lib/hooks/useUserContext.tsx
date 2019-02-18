import { useContext } from "react"
import { AppContext } from "../../application/context"
import { Me } from "../graphql/types"

function useUserContext(): Me.Me {
  const { user } = useContext(AppContext)
  return user!
}

export default useUserContext
