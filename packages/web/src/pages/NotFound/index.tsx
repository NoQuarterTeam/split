import React, { memo, FC } from "react"
import { RouteComponentProps, Redirect } from "@reach/router"
import useAppContext from "../../lib/hooks/useAppContext"

import Center from "../../components/styled/Center"

const NotFound: FC<RouteComponentProps> = () => {
  const { user } = useAppContext()
  if (user) return <Redirect to="/" noThrow={true} />
  return (
    <Center style={{ height: "100vh" }}>
      <h3 style={{ width: "100%", textAlign: "center" }}>
        Not found
        <span aria-label="not found" role="img">
          😲
        </span>
      </h3>
    </Center>
  )
}

export default memo(NotFound)
