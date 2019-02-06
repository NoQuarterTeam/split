import React from "react"
import { Maybe, User } from "../graphql/types"

export interface IContext {
  user: Maybe<User.Fragment>
}
export const AppContext = React.createContext<IContext>({ user: null })
