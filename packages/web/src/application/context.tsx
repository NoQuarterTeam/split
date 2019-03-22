import React from "react"
import { MeQuery, GetHouseQuery } from "@split/connector"

export interface IContext {
  user: MeQuery["me"]
  house: GetHouseQuery["house"]
}
export const AppContext = React.createContext<IContext>({
  user: null,
  house: null,
})
