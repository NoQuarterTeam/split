import React, { FC, Fragment } from "react"

import useAppContext from "../lib/hooks/useAppState"

import { Router } from "@reach/router"
import Settings from "../pages/Settings"
import NotFound from "../pages/NotFound"
import NewHouse from "../pages/NewHouse"

const CheckHouse: FC = ({ children }) => {
  const { user } = useAppContext()
  return user.houseId ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Router>
      <NewHouse path="/" />
      <Settings path="/settings" />
      <NotFound default={true} />
    </Router>
  )
}

export default CheckHouse
