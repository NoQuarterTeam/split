import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import useAppContext from "../../lib/hooks/useAppContext"

import ProfileForm from "../../components/ProfileForm"
import QuickPage from "../../components/QuickPage"

const Settings: FC<RouteComponentProps> = () => {
  const { user } = useAppContext()

  return (
    <QuickPage title="Settings">
      <ProfileForm user={user} />
    </QuickPage>
  )
}

export default Settings
