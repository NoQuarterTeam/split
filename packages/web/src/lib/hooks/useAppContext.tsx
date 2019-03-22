import { useContext } from "react"
import { Me, GetHouse } from "@split/connector"

import { AppContext } from "../../application/context"

type AppContextReturn = {
  user: Me.Me
  house: GetHouse.House
}

function useAppContext(): AppContextReturn {
  const { user, house } = useContext(AppContext)
  return { user: user!, house: house! }
}

export default useAppContext
