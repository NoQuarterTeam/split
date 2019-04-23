import React, { FC, Fragment } from "react"

import useAppContext from "../lib/hooks/useAppContext"
import Login from "../screens/Login"
import Register from "../screens/Register"

function renderAuthRoutes(route: string) {
  switch (route) {
    case "LOGIN":
      return <Login />
    case "REGISTER":
      return <Register />
    default:
      return <Login />
  }
}

const CheckUser: FC = ({ children }) => {
  const { user, route } = useAppContext()
  return user ? <Fragment>{children}</Fragment> : renderAuthRoutes(route)
}

export default CheckUser
