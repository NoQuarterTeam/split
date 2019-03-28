import React from "react"
import { MeQuery, GetHouseQuery } from "@split/connector"

export interface AppContext {
  user: MeQuery["me"]
  house: GetHouseQuery["house"]
}

export const AppContext = React.createContext<AppContext>({
  user: null,
  house: null,
})

export const AppProvider = AppContext.Provider

export interface ThemeContext {
  toggleTheme?: () => void
  isDark?: boolean
}

export const ThemeContext = React.createContext<ThemeContext>({})

export const ThemeProvider = ThemeContext.Provider
