import React from "react"
import { Maybe, UserInfo } from "../graphql/types"

export interface IContext {
  user: Maybe<UserInfo.Fragment>
}
export const AppContext = React.createContext<IContext>({ user: null })
