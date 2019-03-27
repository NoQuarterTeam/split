import React from "react"
import { MeQuery, GetHouseQuery } from "@split/connector"

export interface CoreContext {
  user: MeQuery["me"]
  house: GetHouseQuery["house"]
}

export const CoreContext = React.createContext<CoreContext>({
  user: null,
  house: null,
})

export const CoreProvider = CoreContext.Provider

export interface ThemeContext {
  toggleTheme?: () => void
  isDark?: boolean
}

export const ThemeContext = React.createContext<ThemeContext>({})

export const AppThemeProvider = ThemeContext.Provider
