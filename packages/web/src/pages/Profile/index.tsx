import React, { useContext } from "react"
import { RouteComponentProps } from "@reach/router"

import { AppContext } from "../../application/context"
import Page from "../../components/Page"
import ProfileForm from "../../components/ProfileForm"

function Profile(_: RouteComponentProps) {
  const { user } = useContext(AppContext)

  return (
    <Page activePage="profile">
      <ProfileForm user={user!} />
    </Page>
  )
}

export default Profile
