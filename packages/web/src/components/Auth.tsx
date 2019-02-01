import React, { ReactNode, useContext } from "react"
import Login from "../pages/Login"
import { AppContext } from "../application/context"

interface IAuthProps {
  children: ReactNode
}

function Auth({ children }: IAuthProps) {
  const { user } = useContext(AppContext)
  return user ? <React.Fragment>{children}</React.Fragment> : <Login />
}

export default Auth
