import React, { ReactNode, useContext } from "react"
import LoginForm from "./LoginForm"
import { AppContext } from "../application/context"

interface CheckAuthProps {
  children: ReactNode
}

function CheckAuth({ children }: CheckAuthProps) {
  const { user } = useContext(AppContext)
  return user ? <React.Fragment>{children}</React.Fragment> : <LoginForm />
}

export default CheckAuth
