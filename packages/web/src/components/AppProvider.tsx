import React, { FC } from "react"
import LogRocket from "logrocket"
import { useMe, useGetHouse } from "@split/connector"

import { production } from "../lib/config"
import { AppProvider as AppContextProvider } from "../application/context"

import Loading from "./Loading"

const AppProvider: FC = ({ children }) => {
  const { user, userLoading } = useMe()
  const { house, getHouseLoading } = useGetHouse()

  if (user && production) {
    LogRocket.identify(user.id, {
      name: user.firstName + " " + user.lastName,
      email: user.email,
    })
  }
  return (
    <AppContextProvider value={{ user, house }}>
      <Loading loading={userLoading || getHouseLoading}>{children}</Loading>
    </AppContextProvider>
  )
}

export default AppProvider
