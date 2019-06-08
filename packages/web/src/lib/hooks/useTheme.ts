import { useContext } from "react"

import { ThemeContext } from "../../application/context"

function useTheme() {
  const { toggleTheme, isDark } = useContext(ThemeContext)
  return {
    toggleTheme: toggleTheme!, // eslint-disable-line
    isDark: isDark!, // eslint-disable-line
  }
}

export default useTheme
