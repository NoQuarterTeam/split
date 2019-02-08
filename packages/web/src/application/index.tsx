import React, { memo, Suspense } from "react"
import { Router } from "@reach/router"
import { useQuery } from "react-apollo-hooks"

import { AppContext } from "./context"
import { Me } from "../graphql/types"
import { ME } from "../graphql/user/queries"

import Loading from "../components/Loading"
import CheckAuth from "../components/CheckAuth"

import Balance from "../pages/Balance"
import NotFound from "../pages/NotFound"
import CheckHouse from "../components/CheckHouse"
import NewCost from "../pages/NewCost"
import EditCost from "../pages/EditCost"
import Costs from "../pages/Costs"
import Settings from "../pages/Settings"

function Application() {
  const { data, loading } = useQuery<Me.Query>(ME, {
    suspend: false,
  })
  const user = (data && data.me) || null
  return (
    <AppContext.Provider value={{ user }}>
      <Loading loading={loading}>
        <CheckAuth>
          <CheckHouse>
            <Suspense fallback={<Loading loading={true} />}>
              <Router>
                <Balance path="/" />
                <NewCost path="/new-cost" />
                <EditCost path="/costs/:id" />
                <Costs path="/costs" />
                <Settings path="/profile" />
                <NotFound default={true} />
              </Router>
            </Suspense>
          </CheckHouse>
        </CheckAuth>
      </Loading>
    </AppContext.Provider>
  )
}

export default memo(Application)
