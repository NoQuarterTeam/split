import React, { FC, Fragment } from "react"

import useAppContext from "../lib/hooks/useAppContext"

import Page from "./Page"
import Onboarding from "./Onboarding"

const CheckHouse: FC = ({ children }) => {
  const { house } = useAppContext()
  return house && (house.invites.length > 0 || house.users.length > 1) ? (
    <Fragment>{children}</Fragment>
  ) : (
    <Page>
      <Onboarding />
    </Page>
  )
}

export default CheckHouse
