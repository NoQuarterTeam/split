import React, { FC, Fragment } from "react"
import { Router } from "@reach/router"

import useAppContext from "../lib/hooks/useAppContext"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import ForgotPassword from "../pages/ForgotPassword"
import ResetPassword from "../pages/ResetPassword"
import NotFound from "../pages/NotFound"

const CheckUser: FC = ({ children }) => {
  const { user } = useAppContext()
  return user ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Router>
      <Home path="/" />
      <Login path="/login" />
      <Register path="/register/:token" />
      <Register path="/register" />
      <ForgotPassword path="/forgot-password" />
      <ResetPassword path="/reset-password/:token" />
      <NotFound default={true} />
    </Router>
  )
}

export default CheckUser
