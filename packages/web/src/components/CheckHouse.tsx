import React, { useContext, FC, Fragment } from "react"

import { AppContext } from "../application/context"
import NewHouse from "./NewHouseForm"

const CheckHouse: FC = ({ children }) => {
  const { user } = useContext(AppContext)
  return user!.house ? <Fragment>{children}</Fragment> : <NewHouse />
}

export default CheckHouse
