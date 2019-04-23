import React from "react"
import useAppContext from "../lib/hooks/useAppContext"
import Balance from "../screens/Balance"
import Costs from "../screens/Costs"
import NewCost from "../screens/NewCost"

function Routes() {
  const { route } = useAppContext()
  switch (route) {
    case "BALANCE":
      return <Balance />
    case "COSTS":
      return <Costs />
    case "NEW_COST":
      return <NewCost />
    default:
      return <Balance />
  }
}

export default Routes
