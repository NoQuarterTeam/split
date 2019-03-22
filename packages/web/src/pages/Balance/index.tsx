import React from "react"
import { RouteComponentProps } from "@reach/router"

import styled, { media } from "../../application/theme"
import useAppContext from "../../lib/hooks/useAppContext"
import { round } from "../../lib/helpers"

import Page from "../../components/Page"
import HouseBalance from "../../components/HouseBalance"
import HouseName from "../../components/HouseName"
import HouseInvite from "../../components/HouseInvite"

function Balance(_: RouteComponentProps) {
  const { user, house } = useAppContext()
  const getBalanceHeader = () => {
    if (user.balance > 0) {
      return `You are owed €${round(user.balance * 0.01)}`
    } else {
      return `You owe €${Math.abs(round(user.balance * 0.01))}`
    }
  }
  return (
    <Page>
      <StyledWrapper>
        <StyledHeader>
          <HouseName house={house} />
          <p>{getBalanceHeader()}</p>
        </StyledHeader>
        <HouseBalance users={house.users} />
        <StyledInviteWrapper>
          <HouseInvite house={house} />
        </StyledInviteWrapper>
      </StyledWrapper>
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
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${p => p.theme.paddingS};
  padding-left: 60px;

  p {
    padding-left: ${p => p.theme.paddingS};
    font-size: ${p => p.theme.textM};
    color: ${p => p.theme.colorLabel};
  }

  ${p => media.greaterThan("sm")`
    padding: ${p.theme.paddingXL};
  `}
`

const StyledInviteWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: ${p => p.theme.paddingL};

  ${p => media.greaterThan("sm")`
    padding: ${p.theme.paddingXL};
  `}
`
