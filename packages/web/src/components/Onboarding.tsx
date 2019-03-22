import React, { Fragment } from "react"
import HouseForm from "./HouseForm"
import useAppContext from "../lib/hooks/useAppContext"
import InviteForm from "./InviteForm"

function Onboarding() {
  const { house } = useAppContext()
  return (
    <Fragment>{!house ? <HouseForm /> : <InviteForm house={house} />}</Fragment>
  )
}

export default Onboarding
