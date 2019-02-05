import React, { memo, Suspense } from "react"
import { Router } from "@reach/router"
import { useQuery } from "react-apollo-hooks"

import { AppContext } from "./context"
import { Me } from "../graphql/types"
import { ME } from "../graphql/user/queries"

import Loading from "../components/Loading"
import Auth from "../components/Auth"

import Dashboard from "../pages/Dashboard"
import NotFound from "../pages/NotFound"
import CheckHouse from "../components/CheckHouse"
import NewCost from "../pages/NewCost"
import EditCost from "../pages/EditCost"
import Costs from "../pages/Costs"

function Application() {
  const { data, loading } = useQuery<Me.Query>(ME, {
    suspend: false,
  })
  const user = (data && data.me) || null
  return (
    <AppContext.Provider value={{ user }}>
      <Loading loading={loading}>
        <Auth>
          <CheckHouse>
            <Suspense fallback={<Loading loading={true} />}>
              <Router>
                <Dashboard path="/" />
                <NewCost path="/new-cost" />
                <EditCost path="/costs/:id" />
                <Costs path="/costs" />
                <NotFound default={true} />
              </Router>
            </Suspense>
          </CheckHouse>
        </Auth>
      </Loading>
    </AppContext.Provider>
  )
}

export default memo(Application)
