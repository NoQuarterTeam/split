import React, { FC } from "react"
import { RouteComponentProps, Link } from "@reach/router"
import { round } from "@noquarter/utils"
import { styled } from "@noquarter/ui"
import { media } from "../application/theme"
import useAppContext from "../lib/hooks/useAppState"
import IconPlus from "../assets/images/icon-plus.svg"

import Page from "../components/Page"
import HouseBalance from "../components/HouseBalance"
import HouseName from "../components/HouseName"
import InviteForm from "../components/InviteForm"
import Display from "../components/styled/Display"

const Balance: FC<RouteComponentProps> = () => {
  const { user, house } = useAppContext()
  if (!house) return null
  const getBalanceHeader = () => {
    if (user.balance > 0) {
      return `You are owed €${round(user.balance * 0.01)}`
    } else {
      return `You owe €${Math.abs(round(user.balance * 0.01))}`
    }
  }
  return (
    <Page>
      {house.invites.length === 0 && house.users.length === 1 ? (
        <InviteForm house={house} />
      ) : (
        <StyledWrapper>
          <StyledHeader>
            <StyledName>
              <HouseName house={house} />
              <p>{getBalanceHeader()}</p>
            </StyledName>
            <Display size="md">
              <Link to="/new-cost">
                <StyledAdd src={IconPlus} alt="add" height={60} />
              </Link>
            </Display>
          </StyledHeader>
          <HouseBalance users={house.users} />
          <Display size="md" hide={true}>
            <StyledButtonWrapper>
              <Link to="/new-cost">
                <StyledAdd src={IconPlus} alt="add" height={60} />
              </Link>
            </StyledButtonWrapper>
          </Display>
        </StyledWrapper>
      )}
    </Page>
  )
}

export default Balance

const StyledWrapper = styled.div`
  padding: ${p => p.theme.paddingL};

  ${media.greaterThan("sm")`
    padding: 0;
  `}
`

const StyledHeader = styled.div`
  ${p => p.theme.flexBetween};
  padding: 0 0 0 60px;

  ${media.greaterThan("sm")`
    padding: 0 60px;
  `}
`

const StyledName = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${p => p.theme.paddingS};

  p {
    padding-left: ${p => p.theme.paddingS};
    font-size: ${p => p.theme.textM};
    color: ${p => p.theme.colorLabel};
  }

  ${p => media.greaterThan("sm")`
    padding: ${p.theme.paddingXL};
  `}
`
const StyledButtonWrapper = styled.div`
  width: 100%;
  ${p => p.theme.flexCenter};
`

const StyledAdd = styled.img`
  border-radius: 50%;
`
