import React, { useContext, FC, Fragment } from "react"
import LoginForm from "./LoginForm"
import { AppContext } from "../application/context"
import { Redirect, Router, RouteComponentProps } from "@reach/router"

const CheckAuth: FC = ({ children }) => {
  const { user } = useContext(AppContext)
  return user ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Router>
      <LoginForm path="/" />
      <NotFound default={true} />
    </Router>
  )
}

export default CheckAuth

function NotFound(_: RouteComponentProps) {
  return <Redirect to="/" noThrow={true} />
}
