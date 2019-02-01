import React from "react"
import ReactDOM from "react-dom"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo-hooks"

import * as serviceWorker from "./serviceWorker"

import Application from "./application"
import { ThemeProvider, theme } from "./application/theme"
import { apiUrl } from "./config"
import GlobalStyles from "./globalStyles"

const client = new ApolloClient({
  credentials: "include",
  uri: apiUrl,
})

const UI = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <GlobalStyles />
        <Application />
      </React.Fragment>
    </ThemeProvider>
  </ApolloProvider>
)

ReactDOM.render(<UI />, document.getElementById("root"))

serviceWorker.unregister()
