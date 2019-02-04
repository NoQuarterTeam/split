import React, { memo } from "react"
import styled from "../application/theme"
import { User } from "../graphql/types"

type AvatarProps = {
  user: User.Fragment
  onClick?: () => void
}
function Avatar({ user, onClick }: AvatarProps) {
  return (
    <StyledAvatar onClick={onClick}>
      {user.firstName.split("")[0]}
      {user.lastName.split("")[0]}
    </StyledAvatar>
  )
}

export default memo(Avatar)

const StyledAvatar = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  color: white;
  cursor: pointer;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);

  ${p => p.theme.flexCenter};
  background-color: ${p => p.theme.colorSecondary};
`
