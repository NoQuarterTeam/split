import { useContext } from "react"

import { CoreContext } from "../../application/context"

function useAppContext() {
  const { user, house } = useContext(CoreContext)
  // eslint-disable-next-line
  return { user: user!, house: house! }
}

export default useAppContext
