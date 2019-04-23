import { useContext } from "react"
import { ThemeContext as SCThemeContext } from "styled-components"
import { StateContext, ThemeContext } from "../../application/context"
import { useApolloClient } from "react-apollo-hooks"

function useAppContext() {
  const client = useApolloClient()
  const { toggleTheme, isDark } = useContext(ThemeContext)
  const theme = useContext(SCThemeContext)
  const { user, house } = useContext(StateContext)
  return {
    user: user!, // eslint-disable-line
    house: house!, // eslint-disable-line
    theme,
    toggleTheme: toggleTheme!, // eslint-disable-line
    isDark: isDark!, // eslint-disable-line
    client,
  }
}

export default useAppContext
