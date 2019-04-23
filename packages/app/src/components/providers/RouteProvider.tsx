import React, { FC, Fragment, useState } from "react"
import { RouteProvider as RouteContextProvider } from "../../application/context"
import useAppContext from "../../lib/hooks/useAppContext"

const RouteProvider: FC = ({ children }) => {
  const { user } = useAppContext()
  const [route, setRoute] = useState(user ? "BALANCE" : "LOGIN")
  return (
    <RouteContextProvider value={{ route, setRoute }}>
      <Fragment>{children}</Fragment>
    </RouteContextProvider>
  )
}

export default RouteProvider
