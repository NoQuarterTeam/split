import React, { FC, ReactElement, Fragment } from "react"
import { render } from "@testing-library/react"
import fetch from "unfetch"
import { ApolloProvider } from "react-apollo-hooks"
import ApolloClient from "apollo-boost"
import { ThemeProvider, defaultTheme } from "@noquarter/ui"
import "jest-dom/extend-expect"

import { theme } from "../../application/theme"
import { StateProvider } from "../../application/context"
import { TEST_HOUSE, TEST_USER } from "./data"
import "../prototypes"

const client = new ApolloClient({
  uri: "fakeURL",
  fetch,
})

const AllTheProviders: FC = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={{ ...defaultTheme, ...theme(false, false) }}>
        <Fragment>
          <StateProvider value={{ house: TEST_HOUSE, user: TEST_USER }}>
            <Fragment>{children}</Fragment>
          </StateProvider>
        </Fragment>
      </ThemeProvider>
    </ApolloProvider>
  )
}

const customRender = (ui: ReactElement, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from "@testing-library/react"

export { customRender as render }
