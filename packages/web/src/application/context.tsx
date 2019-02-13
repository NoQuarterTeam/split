import React from "react"
import { Maybe, Me } from "../graphql/types"

export interface IContext {
  user: Maybe<Me.Me>
}
export const AppContext = React.createContext<IContext>({
  user: null,
})
