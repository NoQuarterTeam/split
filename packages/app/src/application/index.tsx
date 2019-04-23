import React from "react"

import AppProvider from "../components/providers/AppProvider"
import CheckUser from "../components/CheckUser"
import Routes from "./routes"

function Application() {
  return (
    <AppProvider>
      <CheckUser>
        <Routes />
      </CheckUser>
    </AppProvider>
  )
}

export default Application
