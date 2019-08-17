import React, { FC } from "react"
import { styled } from "@noquarter/ui"
import { RouteComponentProps } from "@reach/router"

import useAppContext from "../lib/hooks/useAppState"
import { media } from "../application/theme"

import ProfileForm from "../components/ProfileForm"
import QuickPage from "../components/QuickPage"
import FlexGrid from "../components/styled/FlexGrid"
import HouseInvites from "../components/HouseInvites"
import HouseSettings from "../components/HouseSettings"

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
            <div style={{ maxWidth: 450, width: "100%", padding: "0 20px" }}>
              <HouseSettings house={house} />
              <div style={{ marginBottom: 60 }} />
              <HouseInvites house={house} />
            </div>
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
  flex-direction: column;
  width: 100%;
  padding-bottom: ${p => p.theme.paddingXL};

  ${media.greaterThan("md")`
    width: 50%;
  `}
`
