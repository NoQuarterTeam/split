import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"

import Page from "../components/Page"

import GroupForm from "../components/GroupForm"

const NewGroup: FC<RouteComponentProps> = () => {
  return (
    <Page>
      <GroupForm />
    </Page>
  )
}

export default NewGroup
