import { useContext } from "react"

import { StateContext } from "../../application/context"

function useAppState() {
  const { user, house } = useContext(StateContext)
  return {
    user: user!, // eslint-disable-line
    house: house!, // eslint-disable-line
  }
}

export default useAppState
