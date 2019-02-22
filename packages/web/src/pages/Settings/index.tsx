import React from "react"
import { RouteComponentProps } from "@reach/router"

import Page from "../../components/Page"
import ProfileForm from "../../components/ProfileForm"
import useAppContext from "../../lib/hooks/useAppContext"
import Center from "../../components/styled/Center"

function Settings(_: RouteComponentProps) {
  const { user } = useAppContext()

  return (
    <Page activePage="settings">
      <Center style={{ height: "100vh" }}>
        <ProfileForm user={user} />
      </Center>
    </Page>
  )
}

export default Settings
