import React, { useContext } from "react"
import { RouteComponentProps } from "@reach/router"

import { AppContext } from "../../application/context"
import Page from "../../components/Page"
import ProfileForm from "../../components/ProfileForm"

function Settings(_: RouteComponentProps) {
  const { user } = useContext(AppContext)

  return (
    <Page activePage="settings">
      <ProfileForm user={user!} />
    </Page>
  )
}

export default Settings
