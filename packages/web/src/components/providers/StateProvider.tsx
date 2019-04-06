import React, { FC } from "react"
import LogRocket from "logrocket"
import { useMe, useGetHouse } from "@split/connector"

import { production } from "../../lib/config"
import { StateProvider as StateContextProvider } from "../../application/context"

import Loading from "../Loading"

const StateProvider: FC = ({ children }) => {
  const { user, userLoading } = useMe()
  const { house, getHouseLoading } = useGetHouse()

  if (user && production) {
    LogRocket.identify(user.id, {
      name: user.firstName + " " + user.lastName,
      email: user.email,
    })
  }
  return (
    <StateContextProvider value={{ user, house }}>
      <Loading loading={userLoading || getHouseLoading}>{children}</Loading>
    </StateContextProvider>
  )
}

export default StateProvider
