import React, { memo } from "react"
import styled from "../application/theme"
import { User } from "../graphql/types"

type AvatarProps = {
  user: User.Fragment
  onClick?: () => void
}

const userAvatar =
  "https://scontent-amt2-1.xx.fbcdn.net/v/t1.0-1/p320x320/20374225_10155750882820116_4896098332150846690_n.jpg?_nc_cat=108&_nc_ht=scontent-amt2-1.xx&oh=b62b01c498d417c3b508c16d872ac76d&oe=5CEB1BB4"
function Avatar({ user, onClick }: AvatarProps) {
  return (
    <StyledAvatar
      onClick={onClick}
      style={{ backgroundImage: `url(${userAvatar})` }}
    >
      {user.firstName.split("")[0]}
      {user.lastName.split("")[0]}
    </StyledAvatar>
  )
}

export default memo(Avatar)

const StyledAvatar = styled.div`
  height: 80px;
  width: 80px;
  object-fit: contain;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);

  ${p => p.theme.flexCenter};
  background-color: ${p => p.theme.colorSecondary};
  background-position: center;
  background-size: contain;
`
