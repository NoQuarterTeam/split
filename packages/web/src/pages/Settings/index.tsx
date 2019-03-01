import React from "react"

import { RouteComponentProps } from "@reach/router"

import ProfileForm from "../../components/ProfileForm"
import useAppContext from "../../lib/hooks/useAppContext"
import QuickPage from "../../components/QuickPage"

function Settings(_: RouteComponentProps) {
  const { user } = useAppContext()

  return (
    <QuickPage title="Settings">
      <ProfileForm user={user} />
    </QuickPage>
  )
}

export default Settings
