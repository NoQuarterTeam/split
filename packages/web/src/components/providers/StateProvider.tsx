import React, { FC } from "react"
import LogRocket from "logrocket"

import { production } from "../../lib/config"
import { StateProvider as StateContextProvider } from "../../application/context"

import Loading from "../Loading"
import { useMe } from "../../lib/graphql/user/hooks"
import { useGetGroup } from "../../lib/graphql/group/hooks"

const StateProvider: FC = ({ children }) => {
  const { user, userLoading } = useMe()
  const { group, getGroupLoading } = useGetGroup()

  if (user && production) {
    LogRocket.identify(user.id, {
      name: user.firstName + " " + user.lastName,
      email: user.email,
    })
  }
  return (
    <StateContextProvider value={{ user, group }}>
      <Loading loading={userLoading || getGroupLoading}>{children}</Loading>
    </StateContextProvider>
  )
}

export default StateProvider
