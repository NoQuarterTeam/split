import React, { FC, Fragment } from "react"

import useAppContext from "../lib/hooks/useAppState"

import { Router } from "@reach/router"
import Settings from "../pages/Settings"
import NotFound from "../pages/NotFound"
import NewGroup from "../pages/NewGroup"

const CheckGroup: FC = ({ children }) => {
  const { user } = useAppContext()
  return user.groupId ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Router>
      <NewGroup path="/" />
      <Settings path="/settings" />
      <NotFound default={true} />
    </Router>
  )
}

export default CheckGroup
