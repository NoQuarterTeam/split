import React from "react"
import ReactDOM from "react-dom"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo-hooks"
import LogRocket from "logrocket"
import setupLogRocketReact from "logrocket-react"
import MediaQuery from "react-media"

import * as serviceWorker from "./serviceWorker"

import Application from "./application"
import { ThemeProvider, theme } from "./application/theme"
import { apiUrl, production } from "./lib/config"
import GlobalStyles from "./lib/globalStyles"
import "./lib/prototypes"

if (production) {
  LogRocket.init("yluxch/split")
  setupLogRocketReact(LogRocket)
}

const client = new ApolloClient({
  uri: apiUrl,
  request: async operation => {
    const token = await localStorage.getItem("token")
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    })
  },
})

const UI = () => (
  <ApolloProvider client={client}>
    <MediaQuery query="(max-width: 450px)">
      {small => (
        <ThemeProvider theme={theme(small)}>
          <React.Fragment>
            <GlobalStyles />
            <Application />
          </React.Fragment>
        </ThemeProvider>
      )}
    </MediaQuery>
  </ApolloProvider>
)

ReactDOM.render(<UI />, document.getElementById("root"))

serviceWorker.unregister()
