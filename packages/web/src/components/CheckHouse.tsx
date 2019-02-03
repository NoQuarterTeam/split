import React, { useContext, memo } from "react"

import { AppContext } from "../application/context"
import NewHouse from "../pages/NewHouse"

const CheckHouse: React.FC = ({ children }) => {
  const { user } = useContext(AppContext)
  return user!.house ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <NewHouse />
  )
}

export default CheckHouse
