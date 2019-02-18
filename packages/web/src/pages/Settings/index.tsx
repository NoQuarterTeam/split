import React from "react"
import { RouteComponentProps } from "@reach/router"

import Page from "../../components/Page"
import ProfileForm from "../../components/ProfileForm"
import useUserContext from "../../lib/hooks/useUserContext"

function Settings(_: RouteComponentProps) {
  const user = useUserContext()

  return (
    <Page activePage="settings">
      <ProfileForm user={user} />
    </Page>
  )
}

export default Settings
