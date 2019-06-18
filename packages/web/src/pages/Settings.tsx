import React, { FC } from "react"
import { styled } from "@noquarter/ui"
import { RouteComponentProps } from "@reach/router"

import useAppContext from "../lib/hooks/useAppState"
import { media } from "../application/theme"

import ProfileForm from "../components/ProfileForm"
import QuickPage from "../components/QuickPage"
import FlexGrid from "../components/styled/FlexGrid"
import HouseInvites from "../components/HouseInvites"

const Settings: FC<RouteComponentProps> = () => {
  const { user, house } = useAppContext()

  return (
    <QuickPage title="Settings">
      <StyledSettingWrapper>
        <StyledSettingColumn>
          <ProfileForm user={user} />
        </StyledSettingColumn>
        {house && (
          <StyledSettingColumn>
            <HouseInvites house={house} />
          </StyledSettingColumn>
        )}
      </StyledSettingWrapper>
    </QuickPage>
  )
}

export default Settings

const StyledSettingWrapper = styled(FlexGrid)``

const StyledSettingColumn = styled.div`
  ${p => p.theme.flexCenter};
  width: 100%;
  padding-bottom: ${p => p.theme.paddingXL};

  ${media.greaterThan("md")`
    width: 50%;
  `}
`
