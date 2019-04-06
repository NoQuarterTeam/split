import React, { Fragment, FC } from "react"
import { useMe, useGetHouse } from "@split/connector"
import { StateProvider as StateContextProvider } from "../../application/context"
import Loading from "../styled/Loading"

const StateProvider: FC = ({ children }) => {
  const { user, userLoading } = useMe()
  const { house, getHouseLoading } = useGetHouse()

  return (
    <StateContextProvider value={{ user, house }}>
      {userLoading || getHouseLoading ? (
        <Loading />
      ) : (
        <Fragment>{children}</Fragment>
      )}
    </StateContextProvider>
  )
}

export default StateProvider
