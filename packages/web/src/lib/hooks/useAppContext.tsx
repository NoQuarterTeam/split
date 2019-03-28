import { useContext } from "react"

import { AppContext } from "../../application/context"

function useAppContext() {
  const { user, house } = useContext(AppContext)
  // eslint-disable-next-line
  return { user: user!, house: house! }
}

export default useAppContext
