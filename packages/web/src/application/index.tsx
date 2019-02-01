import React, { memo } from "react"
import { Router } from "@reach/router"
import { useQuery } from "react-apollo-hooks"

import { AppContext } from "./context"
import { Me } from "../graphql/types"
import { ME } from "../graphql/user/queries"

import Loading from "../components/Loading"
import Auth from "../components/Auth"

import Home from "../pages/Home"
import NotFound from "../pages/NotFound"

function Application() {
  const { data, loading, error } = useQuery<Me.Query>(ME, {
    suspend: false,
  })
  const user = data && data.me ? data.me : null
  return (
    <AppContext.Provider value={{ user, data }}>
      <Loading loading={loading}>
        <Auth>
          <Router>
            <Home path="/" />
            <NotFound default={true} />
          </Router>
        </Auth>
      </Loading>
    </AppContext.Provider>
  )
}

export default memo(Application)
