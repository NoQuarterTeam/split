import React from "react"

import AppProvider from "../components/providers/AppProvider"
import Balance from "../screens/Balance"
import CheckUser from "../components/CheckUser"

function Application() {
  return (
    <AppProvider>
      <CheckUser>
        <Balance />
      </CheckUser>
    </AppProvider>
  )
}

export default Application
