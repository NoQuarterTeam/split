import React from "react"
import { Maybe, Me, GetHouse } from "@split/connector"

export interface IContext {
  user: Maybe<Me.Me>
  house: Maybe<GetHouse.House>
}
export const AppContext = React.createContext<IContext>({
  user: null,
  house: null,
})
