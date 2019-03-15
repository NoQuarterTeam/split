import React, { memo } from "react"
import styled, { darken, media } from "../application/theme"
import { Maybe } from "../lib/graphql/types"

type UserDetails = {
  firstName: string
  lastName: string
  avatar: Maybe<string>
}

type AvatarProps = {
  user: UserDetails
  size?: number
}

function Avatar({ user, size = 80 }: AvatarProps) {
  return (
    <StyledAvatar
      size={size}
      style={{ backgroundImage: `url(${user.avatar})` }}
    >
      {!user.avatar && (
        <React.Fragment>
          {user.firstName.split("")[0]}
          {user.lastName.split("")[0]}
        </React.Fragment>
      )}
    </StyledAvatar>
  )
}

export default memo(Avatar)

const StyledAvatar = styled.div<{ size: number }>`
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50%;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);

  height: ${p => 0.9 * p.size}px;
  width: ${p => 0.9 * p.size}px;

  background-color: ${p => p.theme.colorBlue};
  color: ${p => darken(0.2, p.theme.colorBlue)};
  font-weight: ${p => p.theme.fontBlack};
  font-size: ${p => p.theme.textS};
  ${p => p.theme.flexCenter};

  ${p => media.greaterThan("sm")`
    height: ${p.size}px;
    width: ${p.size}px; 
  `}
`
