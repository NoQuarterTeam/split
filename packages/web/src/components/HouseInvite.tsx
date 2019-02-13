import React, { memo } from "react"
import { GetHouse } from "../graphql/types"
import styled from "../application/theme"

type HouseInviteProps = {
  house: GetHouse.House
}

function HouseInvite({ house }: HouseInviteProps) {
  return <StyledInviteButton>Invite house mate</StyledInviteButton>
}

export default memo(HouseInvite)

const StyledInviteButton = styled.div`
  border-radius: 20px;
  cursor: pointer;
  border: 2px solid ${p => p.theme.colorHighlight};
  color: ${p => p.theme.colorSecondary};
  padding: ${p => `${p.theme.paddingM} ${p.theme.paddingL}`};

  &:hover {
    opacity: 0.8;
  }
`
