import React from "react"
import { MeQuery, GetHouseQuery } from "@split/connector"

// App State

export interface StateContext {
  user: MeQuery["me"]
  house: GetHouseQuery["house"]
}

export const StateContext = React.createContext<StateContext>({
  user: null,
  house: null,
})

export const StateProvider = StateContext.Provider

// Theme

export interface ThemeContext {
  toggleTheme?: () => void
  isDark?: boolean
}

export const ThemeContext = React.createContext<ThemeContext>({})

export const ThemeProvider = ThemeContext.Provider

// Route

export type Routes = "LOGIN" | "REGISTER" | "BALANCE" | "COSTS" | "NEW_COST"

export interface RouteContext {
  setRoute?: (route: Routes) => void
  route?: Routes
}

export const RouteContext = React.createContext<RouteContext>({})

export const RouteProvider = RouteContext.Provider
