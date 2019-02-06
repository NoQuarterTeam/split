import React, { memo } from "react"
import styled from "../application/theme"
import { Me } from "../graphql/types"

type AvatarProps = {
  user: Me.Me
  onClick?: () => void
}

function Avatar({ user, onClick }: AvatarProps) {
  return (
    <StyledAvatar
      onClick={onClick}
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
