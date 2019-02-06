import React, { memo } from "react"
import { RouteComponentProps } from "@reach/router"
import Page from "../../components/Page"

function NotFound(_: RouteComponentProps) {
  return (
    <Page>
      <h3 style={{ width: "100%", textAlign: "center" }}>Not found 😲</h3>
    </Page>
  )
}

export default memo(NotFound)
