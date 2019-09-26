import { useContext } from "react"

import { StateContext } from "../../application/context"

function useAppState() {
  const { user, group } = useContext(StateContext)
  return {
    user: user!, // eslint-disable-line
    group: group!, // eslint-disable-line
  }
}

export default useAppState
