import React, { FC } from "react"
import { styled } from "@noquarter/ui"
import { RouteComponentProps } from "@reach/router"

import useAppContext from "../lib/hooks/useAppState"
import { media } from "../application/theme"

import ProfileForm from "../components/ProfileForm"
import QuickPage from "../components/QuickPage"
import FlexGrid from "../components/styled/FlexGrid"
import GroupInvites from "../components/GroupInvites"
import GroupSettings from "../components/GroupSettings"

const Settings: FC<RouteComponentProps> = () => {
  const { user, group } = useAppContext()

  return (
    <QuickPage title="Settings">
      <StyledSettingWrapper>
        <StyledSettingColumn>
          <ProfileForm user={user} />
        </StyledSettingColumn>
        {group && (
          <StyledSettingColumn>
            <div style={{ maxWidth: 450, width: "100%", padding: "0 20px" }}>
              <GroupSettings group={group} />
              <div style={{ marginBottom: 60 }} />
              <GroupInvites group={group} />
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
