import React, { memo } from "react"
import { UserFragment } from "@split/connector"
import { styled, darken } from "@noquarter/ui"
import { round } from "@noquarter/utils"

import { media } from "../application/theme"
import Avatar from "./Avatar"
import useAppContext from "../lib/hooks/useAppContext"

interface HouseBalanceProps {
  users: UserFragment[]
}

function HouseBalance({ users }: HouseBalanceProps) {
  const { house } = useAppContext()
  const total = users.sumBy("balance", true)

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
      {house && house.invites.length > 0 && (
        <StyledUserGraph>
          <StyledSpacer />
          <StyledPending>Pending invites</StyledPending>
          <StyledSpacer />
        </StyledUserGraph>
      )}
    </StyledHouseBalance>
  )
}

export default memo(HouseBalance)

const StyledHouseBalance = styled.div`
  max-width: 500px;
  width: 100%;
  height: 400px;
  margin: 0 auto;

  ${p => p.theme.flexAround};

  ${media.greaterThan("sm")`
    margin: 30px auto;
  `}
`

const StyledUserGraph = styled.div`
  flex-direction: column;
  ${p => p.theme.flexCenter};
`

const StyledSpacer = styled.p`
  height: 30px;
  line-height: 30px;
`

const StyledUserBalance = styled(StyledSpacer)`
  color: ${p => p.theme.colorText};
`

const StyledPending = styled.div`
  border-radius: 50%;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  height: ${0.9 * 80}px;
  width: ${0.9 * 80}px;

  background-color: ${p => p.theme.colorPrimary};
  color: ${p => darken(0.2, p.theme.colorPrimary)};
  font-weight: ${p => p.theme.fontExtraBold};
  font-size: ${p => p.theme.textS};
  ${p => p.theme.flexCenter};

  ${media.greaterThan("sm")`
    height: ${80}px;
    width: ${80}px; 
  `}
`

const StyledFlame = styled.div<{ percentage: number; negative: boolean }>`
  position: absolute;
  width: 8px;
  border-radius: 8px;
  background-color: ${p =>
    p.negative ? p.theme.colorPrimary : p.theme.colorSecondary};
  height: ${p => p.percentage * 2}px; /* Max 125px as 50% is the max abs */
  ${p => (p.negative ? "top: 100%;" : "bottom: 100%;")}

  ${p => media.greaterThan("sm")`
    height: ${p.percentage * 2.5}px; /* Max 125px as 50% is the max abs */
  `}
`
