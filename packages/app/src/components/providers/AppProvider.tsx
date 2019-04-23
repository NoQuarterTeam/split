import React, { FC } from "react"
import ThemeProvider from "./ThemeProvider"
import ApolloProvider from "./ApolloProvider"
import StateProvider from "./StateProvider"
import RouteProvider from "./RouteProvider"

const AppProvider: FC = ({ children }) => {
  return (
    <ApolloProvider>
      <ThemeProvider>
        <StateProvider>
          <RouteProvider>{children}</RouteProvider>
        </StateProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default AppProvider
