import { useContext } from "react"

import { AppContext } from "../../application/context"

function useAppContext() {
  const { user, house } = useContext(AppContext)
  // Casting them as not null for App as there is CheckUser && CheckHouse
  if (!user || !house) throw new Error("")
  return { user, house }
}

export default useAppContext
