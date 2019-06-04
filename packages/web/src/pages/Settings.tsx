import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import { styled } from "@noquarter/ui"

import useAppContext from "../lib/hooks/useAppContext"

import ProfileForm from "../components/ProfileForm"
import QuickPage from "../components/QuickPage"
import HouseInvite from "../components/HouseInvite"

const Settings: FC<RouteComponentProps> = () => {
  const { user, house } = useAppContext()

  return (
    <QuickPage title="Settings">
      <ProfileForm user={user} />
      <StyledWrapper>
        <HouseInvite house={house} />
      </StyledWrapper>
    </QuickPage>
  )
}

export default Settings

const StyledWrapper = styled.div`
  width: 100%;
  padding: ${p => p.theme.paddingXL};
  /* padding-top: 0; */
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`
