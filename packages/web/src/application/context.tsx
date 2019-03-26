import React from "react"
import { MeQuery, GetHouseQuery } from "@split/connector"

export interface Context {
  user: MeQuery["me"]
  house: GetHouseQuery["house"]
}
export const AppContext = React.createContext<Context>({
  user: null,
  house: null,
})
