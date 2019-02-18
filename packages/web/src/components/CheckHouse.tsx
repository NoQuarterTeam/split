import React, { FC, Fragment } from "react"
import LoginForm from "./LoginForm"
import useUserContext from "../lib/hooks/useUserContext"

const CheckHouse: FC = ({ children }) => {
  const user = useUserContext()
  return user ? <Fragment>{children}</Fragment> : <LoginForm />
}

export default CheckHouse
