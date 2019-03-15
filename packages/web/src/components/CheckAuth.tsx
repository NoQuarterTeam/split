import React, { FC, Fragment } from "react"
import { Redirect, Router, RouteComponentProps } from "@reach/router"
import useAppContext from "../lib/hooks/useAppContext"

import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import ForgotPassword from "../pages/ForgotPassword"
import ResetPassword from "../pages/ResetPassword"

const CheckAuth: FC = ({ children }) => {
  const { user } = useAppContext()
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
