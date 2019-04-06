import React from "react"
import { MeQuery, GetHouseQuery } from "@split/connector"

export interface StateContext {
  user: MeQuery["me"]
  house: GetHouseQuery["house"]
}

export const StateContext = React.createContext<StateContext>({
  user: null,
  house: null,
})

export const StateProvider = StateContext.Provider

export interface ThemeContext {
  toggleTheme?: () => void
  isDark?: boolean
}

export const ThemeContext = React.createContext<ThemeContext>({})

export const ThemeProvider = ThemeContext.Provider
