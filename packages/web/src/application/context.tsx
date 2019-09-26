import React from "react"
import { MeQuery, GetGroupQuery } from "../lib/graphql/types"

export interface StateContext {
  user: MeQuery["me"]
  group: GetGroupQuery["group"]
}

export const StateContext = React.createContext<StateContext>({
  user: null,
  group: null,
})

export const StateProvider = StateContext.Provider

export interface ThemeContext {
  toggleTheme?: () => void
  isDark?: boolean
}

export const ThemeContext = React.createContext<ThemeContext>({})

export const ThemeProvider = ThemeContext.Provider
