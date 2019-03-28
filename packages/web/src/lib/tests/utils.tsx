import React, { FC, ReactElement } from "react"
import { render } from "react-testing-library"
import fetch from "unfetch"
import { ApolloProvider } from "react-apollo-hooks"
import ApolloClient from "apollo-boost"
import "jest-dom/extend-expect"

import { ThemeProvider, theme } from "../../application/theme"
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
      <ThemeProvider theme={theme(false, false)}>
        <StateProvider value={{ house: TEST_HOUSE, user: TEST_USER }}>
          {children}
        </StateProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

const customRender = (ui: ReactElement, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from "react-testing-library"

export { customRender as render }
