import React, { memo } from "react"
import { User } from "../lib/graphql/types"
import { round } from "../lib/helpers"
import styled from "../application/theme"
import Avatar from "./Avatar"

type IHouseBalance = {
  users: User.Fragment[]
}

function HouseBalance({ users }: IHouseBalance) {
  const total = users.reduce((acc, u) => Math.abs(u.balance) + acc, 0)

  return (
    <StyledHouseBalance>
      {users.map(user => {
        return (
          <StyledUserGraph key={user.id}>
            <StyledFlame
              negative={user.balance < 0}
              percentage={round(Math.abs(user.balance) / total) * 100}
            />
            <StyledSpacer />
            <Avatar user={user} />
            <StyledUserBalance>
              {user.balance < 0 && "-"} € {round(Math.abs(user.balance * 0.01))}
            </StyledUserBalance>
          </StyledUserGraph>
        )
      })}
    </StyledHouseBalance>
  )
}

export default memo(HouseBalance)

const StyledHouseBalance = styled.div`
  max-width: 500px;
  width: 100%;
  height: 400px;
  margin: 30px auto;
  position: relative;

  ${p => p.theme.flexAround};
`

const StyledUserGraph = styled.div`
  position: relative;
  flex-direction: column;
  ${p => p.theme.flexCenter};
`

const StyledSpacer = styled.p`
  padding: ${p => p.theme.paddingM} 0;
`

const StyledUserBalance = styled(StyledSpacer)`
  color: ${p => p.theme.colorHeader};
`

const StyledFlame = styled.div<{ percentage: number; negative: boolean }>`
  position: absolute;
  width: 8px;
  border-radius: 8px;
  background-color: ${p =>
    p.negative ? p.theme.colorPink : p.theme.colorBlue};
  height: ${p => p.percentage * 2.5}px; /* Max 125px as 50% is the max abs */
  ${p => (p.negative ? "top: 100%;" : "bottom: 100%;")};
`
