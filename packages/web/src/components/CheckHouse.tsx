import React, { FC, Fragment } from "react"

import useAppContext from "../lib/hooks/useAppState"

import Page from "./Page"
import HouseForm from "./HouseForm"

const CheckHouse: FC = ({ children }) => {
  const { user } = useAppContext()
  return user.houseId ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Page>
      <HouseForm />
    </Page>
  )
}

export default CheckHouse
