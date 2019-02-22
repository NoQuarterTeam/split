import { useContext } from "react"
import { AppContext } from "../../application/context"
import { Me, GetHouse } from "../graphql/types"

type AppContextReturn = {
  user: Me.Me
  house: GetHouse.House
}

function useAppContext(): AppContextReturn {
  const { user, house } = useContext(AppContext)
  return { user: user!, house: house! }
}

export default useAppContext
