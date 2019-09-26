import React, { Suspense } from "react"
import { Router } from "@reach/router"
import ErrorBoundary from "react-error-boundary"

import AppProvider from "../components/providers/AppProvider"

import CheckUser from "../components/CheckUser"
import CheckGroup from "../components/CheckGroup"
import ErrorFallback from "../components/ErrorFallback"

import Settings from "../pages/Settings"
import Balance from "../pages/Balance"
import NotFound from "../pages/NotFound"
import NewCost from "../pages/NewCost"
import EditCost from "../pages/EditCost"
import Costs from "../pages/Costs"
import Loading from "../components/Loading"

function Application() {
  const errorHandler = (e: Error) => console.log(e)
  return (
    <AppProvider>
      <ErrorBoundary onError={errorHandler} FallbackComponent={ErrorFallback}>
        <Suspense fallback={<Loading loading={true} />}>
          <CheckUser>
            <CheckGroup>
              <Router>
                <Balance path="/" />
                <NewCost path="/new-cost" />
                <EditCost path="/costs/:id" />
                <Costs path="/costs" />
                <Settings path="/settings" />
                <NotFound default={true} />
              </Router>
            </CheckGroup>
          </CheckUser>
        </Suspense>
      </ErrorBoundary>
    </AppProvider>
  )
}

export default Application
