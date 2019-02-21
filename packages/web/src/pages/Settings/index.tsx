import React from "react"
import { RouteComponentProps } from "@reach/router"

import Page from "../../components/Page"
import ProfileForm from "../../components/ProfileForm"
import useUserContext from "../../lib/hooks/useUserContext"
import Center from "../../components/styled/Center"

function Settings(_: RouteComponentProps) {
  const user = useUserContext()

  return (
    <Page activePage="settings">
      <Center style={{ height: "100vh" }}>
        <ProfileForm user={user} />
      </Center>
    </Page>
  )
}

export default Settings
