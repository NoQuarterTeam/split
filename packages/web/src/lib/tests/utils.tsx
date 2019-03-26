import React, { FC, ReactElement } from "react"
import { render } from "react-testing-library"
import "jest-dom/extend-expect"
import { ThemeProvider, theme } from "../../application/theme"
import { AppContext } from "../../application/context"
import { TEST_HOUSE, TEST_USER } from "./data"
import "../prototypes"

const AllTheProviders: FC = () => {
  return (
    <ThemeProvider theme={theme(false)}>
      <AppContext.Provider value={{ house: TEST_HOUSE, user: TEST_USER }} />
    </ThemeProvider>
  )
}

const customRender = (ui: ReactElement, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from "react-testing-library"

export { customRender as render }
