import { useContext } from "react"
import { ThemeContext as SCThemeContext } from "styled-components"
import {
  StateContext,
  ThemeContext,
  RouteContext,
} from "../../application/context"
import { useApolloClient } from "react-apollo-hooks"

function useAppContext() {
  const client = useApolloClient()
  const themeContext = useContext(ThemeContext)
  const routeContext = useContext(RouteContext)
  const theme = useContext(SCThemeContext)
  const stateContext = useContext(StateContext)

  if (!client || !themeContext || !theme || !stateContext || !routeContext)
    throw new Error("hook must be called under <AppProvider>")

  return {
    user: stateContext.user!, // eslint-disable-line
    house: stateContext.house!, // eslint-disable-line
    theme,
    toggleTheme: theme.toggleTheme!, // eslint-disable-line
    isDark: theme.isDark!, // eslint-disable-line
    setRoute: routeContext.setRoute!, // eslint-disable-line
    route: routeContext.route!, // eslint-disable-line
    client,
  }
}

export default useAppContext
