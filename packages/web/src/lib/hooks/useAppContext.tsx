import { useContext } from "react"
import { AppContext } from "../../application/context"
import { MeMe, GetHouseHouse } from "../graphql/types"

type AppContextReturn = {
  user: MeMe
  house: GetHouseHouse
}

function useAppContext(): AppContextReturn {
  const { user, house } = useContext(AppContext)
  return { user: user!, house: house! }
}

export default useAppContext
