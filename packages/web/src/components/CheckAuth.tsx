import React, { useContext, FC } from "react"
import LoginForm from "./LoginForm"
import { AppContext } from "../application/context"

const CheckAuth: FC = ({ children }) => {
  const { user } = useContext(AppContext)
  return user ? <React.Fragment>{children}</React.Fragment> : <LoginForm />
}

export default CheckAuth
