import React, { FC, ReactElement, Fragment } from "react"
import { render } from "@testing-library/react"

import { ThemeProvider, defaultTheme } from "@noquarter/ui"
import "jest-dom/extend-expect"

import { theme } from "../../application/theme"
import { StateProvider } from "../../application/context"
import { TEST_HOUSE, TEST_USER } from "./data"
import "../prototypes"

const AllTheProviders: FC = ({ children }) => {
  return (
    <ThemeProvider theme={{ ...defaultTheme, ...theme(false, false) }}>
      <StateProvider value={{ group: TEST_HOUSE, user: TEST_USER }}>
        <Fragment>{children}</Fragment>
      </StateProvider>
    </ThemeProvider>
  )
}

const customRender = (ui: ReactElement, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from "@testing-library/react"

export default customRender
