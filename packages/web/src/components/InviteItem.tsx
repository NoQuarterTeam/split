import React, { FC, memo } from "react"
import { Button, styled } from "@noquarter/ui"
import { useDestroyInvite } from "../lib/graphql/invite/hooks"
import { InviteFragment } from "../lib/graphql/types"

interface Props {
  invite: InviteFragment
}

const InviteItem: FC<Props> = ({ invite }) => {
  const [destroyInvite] = useDestroyInvite(invite.id)

  const handleDestroyInvite = () => {
    destroyInvite({
      variables: { inviteId: invite.id },
    })
      .then(async () => {})
      .catch(() => {})
  }

  return (
    <StyledInvite key={invite.id}>
      <StyledInviteEmail>{invite.email}</StyledInviteEmail>
      <Button variant="text" color="tertiary" onClick={handleDestroyInvite}>
        Remove
      </Button>
    </StyledInvite>
  )
}

export default memo(InviteItem)

const StyledInvite = styled.div`
  width: 100%;
  padding: ${p => p.theme.paddingS} ${p => p.theme.paddingM};
  background-color: ${p => p.theme.colorBackground};
  border-radius: ${p => p.theme.borderRadius};
  margin-bottom: ${p => p.theme.paddingM};
  ${p => p.theme.flexBetween};
`

const StyledInviteEmail = styled.p`
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 ${p => p.theme.paddingL};
`
