import React, { FC, Fragment } from "react"
import { Redirect, Router, RouteComponentProps } from "@reach/router"
import LoginForm from "./LoginForm"
import Home from "./Home"
import RegisterForm from "./RegisterForm"
import useUserContext from "../lib/hooks/useUserContext"

const CheckAuth: FC = ({ children }) => {
  const user = useUserContext()
  return user ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Router>
      <Home path="/" />
      <LoginForm path="/login" />
      <RegisterForm path="/register" />
      <NotFound default={true} />
    </Router>
  )
}

export default CheckAuth

function NotFound(_: RouteComponentProps) {
  return <Redirect to="/" noThrow={true} />
}
