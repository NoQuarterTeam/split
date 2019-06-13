import React, { memo } from "react"
import { InviteFragment } from "@split/connector"

import { styled } from "@noquarter/ui"
import HouseInviteForm from "./HouseInviteForm"
import InviteItem from "./InviteItem"

interface HouseInvitesProps {
  house: { id: string; invites: InviteFragment[] }
}

function HouseInvites({ house }: HouseInvitesProps) {
  return (
    <StyledInviteWrapper>
      <StyledHeader>Invitations</StyledHeader>
      {house.invites.map(invite => (
        <InviteItem key={invite.id} invite={invite} />
      ))}
      <HouseInviteForm house={house} />
    </StyledInviteWrapper>
  )
}

export default memo(HouseInvites)

const StyledInviteWrapper = styled.div`
  ${p => p.theme.flexCenter};
  flex-direction: column;
`

const StyledHeader = styled.h3`
  padding: ${p => p.theme.paddingL};
  margin-bottom: ${p => p.theme.paddingM};
`
