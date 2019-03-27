import { useContext } from "react"

import { ThemeContext } from "../../application/context"

function useThemeContext() {
  const { toggleTheme, isDark } = useContext(ThemeContext)
  // eslint-disable-next-line
  return { toggleTheme: toggleTheme!, isDark: isDark! }
}

export default useThemeContext
