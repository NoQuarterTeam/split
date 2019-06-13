import React, { FC, Fragment } from "react"
import useMedia from "use-media"
import { useLocalStorage } from "@noquarter/hooks"
import { ThemeProvider as SCThemeProvider } from "@noquarter/ui"

import { ThemeProvider as ThemeContextProvider } from "../../application/context"
import { theme } from "../../application/theme"

const ThemeProvider: FC = ({ children }) => {
  const isSmall = useMedia({ maxWidth: 450 })
  const [isDark, setDarkTheme] = useLocalStorage("darkTheme", false)
  const toggleTheme = () => setDarkTheme(!isDark)
  return (
    <ThemeContextProvider value={{ toggleTheme, isDark }}>
      <SCThemeProvider theme={theme(isSmall, isDark)}>
        <Fragment>{children}</Fragment>
      </SCThemeProvider>
    </ThemeContextProvider>
  )
}

export default ThemeProvider
