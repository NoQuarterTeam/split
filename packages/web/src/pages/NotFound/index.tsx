import React, { memo } from "react"
import { RouteComponentProps } from "@reach/router"
import Center from "../../components/styled/Center"

function NotFound(_: RouteComponentProps) {
  return (
    <Center style={{ height: "100vh" }}>
      <h3 style={{ width: "100%", textAlign: "center" }}>Not found 😲</h3>
    </Center>
  )
}

export default memo(NotFound)
