import React, { FC, Fragment } from "react"

import useAppContext from "../lib/hooks/useAppContext"
import Login from "../screens/Login"

const CheckUser: FC = ({ children }) => {
  const { user } = useAppContext()
  return user ? <Fragment>{children}</Fragment> : <Login />
}

export default CheckUser
