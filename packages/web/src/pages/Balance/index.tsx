import React from "react"
import { RouteComponentProps } from "@reach/router"

import styled, { media } from "../../application/theme"

import useAppContext from "../../lib/hooks/useAppContext"

import Page from "../../components/Page"

import HouseBalance from "../../components/HouseBalance"
import HouseForm from "../../components/HouseForm"
import HouseName from "../../components/HouseName"
import HouseInvite from "../../components/HouseInvite"
import { round } from "../../lib/helpers"

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
    <Page activePage="balance">
      {!user.houseId ? (
        <HouseForm />
      ) : !house ? null : (
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
      )}
    </Page>
  )
}

export default Balance

const StyledWrapper = styled.div`
  height: 100%;
  width: 100%;

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

  p {
    padding-left: ${p => p.theme.paddingS};
  }

  ${p => media.greaterThan("sm")`
    padding: ${p.theme.paddingXL};
  `}
`

const StyledInviteWrapper = styled.div`
  padding: 0 ${p => p.theme.flexCenter};

  ${p => media.greaterThan("sm")`
    padding: ${p.theme.paddingXL};
  `}
`
