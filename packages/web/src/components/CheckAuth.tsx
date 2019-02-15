import React, { useContext, FC, Fragment } from "react"
import { AppContext } from "../application/context"
import { Redirect, Router, RouteComponentProps } from "@reach/router"
import LoginForm from "./LoginForm"
import Home from "./Home"
import RegisterForm from "./RegisterForm"

const CheckAuth: FC = ({ children }) => {
  const { user } = useContext(AppContext)
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
