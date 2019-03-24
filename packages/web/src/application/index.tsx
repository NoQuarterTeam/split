import React, { memo, Suspense } from "react"
import { Router } from "@reach/router"
import LogRocket from "logrocket"
import ErrorBoundary from "react-error-boundary"
import { useMe, useGetHouse } from "@split/connector"

import { AppContext } from "./context"
import { production } from "../lib/config"

import Loading from "../components/Loading"
import CheckUser from "../components/CheckUser"
import CheckHouse from "../components/CheckHouse"
import ErrorFallback from "../components/ErrorFallback"

import Settings from "../pages/Settings"
import Balance from "../pages/Balance"
import NotFound from "../pages/NotFound"
import NewCost from "../pages/NewCost"
import EditCost from "../pages/EditCost"
import Costs from "../pages/Costs"

function Application() {
  const { user, userLoading } = useMe()
  const { house, getHouseLoading } = useGetHouse()
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
    <AppContext.Provider value={{ user, house }}>
      <ErrorBoundary onError={errorHandler} FallbackComponent={ErrorFallback}>
        <Loading loading={userLoading || getHouseLoading}>
          <Suspense fallback={null}>
            <CheckUser>
              <CheckHouse>
                <Router>
                  <Balance path="/" />
                  <NewCost path="/new-cost" />
                  <EditCost path="/costs/:id" />
                  <Costs path="/costs" />
                  <Settings path="/settings" />
                  <NotFound default={true} />
                </Router>
              </CheckHouse>
            </CheckUser>
          </Suspense>
        </Loading>
      </ErrorBoundary>
    </AppContext.Provider>
  )
}

export default memo(Application)
