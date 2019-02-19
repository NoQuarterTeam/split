import React from "react"
import { RouteComponentProps } from "@reach/router"

import styled, { media } from "../../application/theme"

import { round } from "../../lib/helpers"
import { useGetHouseQuery } from "../../lib/graphql/house/hooks"
import useUserContext from "../../lib/hooks/useUserContext"

import Page from "../../components/Page"

import HouseBalance from "../../components/HouseBalance"
import HouseForm from "../../components/HouseForm"
import HouseName from "../../components/HouseName"
import HouseInvite from "../../components/HouseInvite"

function Balance(_: RouteComponentProps) {
  const user = useUserContext()
  const { house } = useGetHouseQuery()
  const getBalanceHeader = () => {
    if (user.balance > 0) {
      return `You are owed €${round(user.balance * 0.01, 2)}`
    } else {
      return `You owe €${round(Math.abs(user.balance * 0.01), 2)}`
    }
  }

  return (
    <Page activePage="balance">
      {!user.houseId ? (
        <HouseForm />
      ) : (
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
