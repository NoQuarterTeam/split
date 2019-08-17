import React, { memo } from "react"

import { styled } from "@noquarter/ui"
import HouseInviteForm from "./HouseInviteForm"
import InviteItem from "./InviteItem"
import { InviteFragment } from "../lib/graphql/types"

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
  width: 100%;
  ${p => p.theme.flexCenter};
  flex-direction: column;
`

const StyledHeader = styled.h3`
  color: ${p => p.theme.colorText};
  font-size: ${p => p.theme.textL};
  font-weight: ${p => p.theme.fontNormal};
  margin-bottom: ${p => p.theme.paddingM};
`
