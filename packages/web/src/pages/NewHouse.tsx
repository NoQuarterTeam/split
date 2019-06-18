import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"

import Page from "../components/Page"

import HouseForm from "../components/HouseForm"

const NewHouse: FC<RouteComponentProps> = () => {
  return (
    <Page>
      <HouseForm />
    </Page>
  )
}

export default NewHouse
