import React, { FC, Fragment } from "react"
import { Redirect, Router, RouteComponentProps } from "@reach/router"
import Home from "./Home"
import useUserContext from "../lib/hooks/useUserContext"

import Login from "../pages/Login"
import Register from "../pages/Register"
import ForgotPassword from "../pages/ForgotPassword"
import ResetPassword from "../pages/ResetPassword"

const CheckAuth: FC = ({ children }) => {
  const user = useUserContext()
  return user ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Router>
      <Home path="/" />
      <Login path="/login" />
      <Register path="/register" />
      <ForgotPassword path="/forgot-password" />
      <ResetPassword path="/reset-password/:token" />
      <NotFound default={true} />
    </Router>
  )
}

export default CheckAuth

function NotFound(_: RouteComponentProps) {
  return <Redirect to="/" noThrow={true} />
}
