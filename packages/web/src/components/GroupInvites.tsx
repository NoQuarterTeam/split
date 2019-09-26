import React, { memo } from "react"

import { styled } from "@noquarter/ui"
import GroupInviteForm from "./GroupInviteForm"
import InviteItem from "./InviteItem"
import { InviteFragment } from "../lib/graphql/types"

interface GroupInvitesProps {
  group: { id: string; invites: InviteFragment[] }
}

function GroupInvites({ group }: GroupInvitesProps) {
  return (
    <StyledInviteWrapper>
      <StyledHeader>Invitations</StyledHeader>
      {group.invites.map(invite => (
        <InviteItem key={invite.id} invite={invite} />
      ))}
      <GroupInviteForm group={group} />
    </StyledInviteWrapper>
  )
}

export default memo(GroupInvites)

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
