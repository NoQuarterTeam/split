import React, { memo, Suspense } from "react"
import { Router } from "@reach/router"
import LogRocket from "logrocket"

import ErrorBoundary from "react-error-boundary"

import { AppContext } from "./context"

import { useMeQuery } from "../lib/graphql/user/hooks"
import { production } from "../lib/config"

import Loading from "../components/Loading"
import CheckAuth from "../components/CheckAuth"
import Balance from "../pages/Balance"
import NotFound from "../pages/NotFound"
import NewCost from "../pages/NewCost"
import EditCost from "../pages/EditCost"
import Costs from "../pages/Costs"
import Settings from "../pages/Settings"
import ErrorFallback from "../components/ErrorFallback"

function Application() {
  const { user, loading } = useMeQuery()
  const errorHandler = (e: Error, componentStack: string) => {
    console.log(e)
  }
  if (user && production) {
    LogRocket.identify(user.id, {
      name: user.firstName + " " + user.lastName,
      email: user.email,
    })
  }

  return (
    <AppContext.Provider value={{ user }}>
      <ErrorBoundary onError={errorHandler} FallbackComponent={ErrorFallback}>
        <Loading loading={loading}>
          <Suspense fallback={null}>
            <CheckAuth>
              <Router>
                <Balance path="/" />
                <NewCost path="/new-cost" />
                <EditCost path="/costs/:id" />
                <Costs path="/costs" />
                <Settings path="/profile" />
                <NotFound default={true} />
              </Router>
            </CheckAuth>
          </Suspense>
        </Loading>
      </ErrorBoundary>
    </AppContext.Provider>
  )
}

export default memo(Application)
