import React from "react"
import { User } from "../graphql/types"

export interface IContext {
  user: User | null
}
export const AppContext = React.createContext<IContext>({
  user: null,
})
