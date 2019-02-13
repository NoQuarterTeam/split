import React, { useContext, FC, Fragment } from "react"
import LoginForm from "./LoginForm"
import { AppContext } from "../application/context"

const CheckHouse: FC = ({ children }) => {
  const { user } = useContext(AppContext)
  return user ? <Fragment>{children}</Fragment> : <LoginForm />
}

export default CheckHouse
