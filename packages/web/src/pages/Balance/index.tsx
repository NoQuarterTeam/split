import React, { useContext } from "react"
import { RouteComponentProps } from "@reach/router"
import { useQuery } from "react-apollo-hooks"

import styled from "../../application/theme"
import { AppContext } from "../../application/context"

import { GetHouse } from "../../graphql/types"
import { GET_HOUSE } from "../../graphql/house/queries"
import { round } from "../../lib/helpers"

import Page from "../../components/Page"

import HouseBalance from "../../components/HouseBalance"

function Balance(_: RouteComponentProps) {
  const { user } = useContext(AppContext)
  const { data, error } = useQuery<GetHouse.Query>(GET_HOUSE)

  const getBalanceHeader = () => {
    if (user!.balance > 0) {
      return `You are owed €${round(user!.balance * 0.01, 2)}`
    } else {
      return `You owe €${round(Math.abs(user!.balance * 0.01), 2)}`
    }
  }
  return (
    <Page activePage="balance">
      <StyledHeader>{user!.house!.name}</StyledHeader>
      <HouseBalance users={data!.house.users} />
      <StyledSummary>{getBalanceHeader()}</StyledSummary>
    </Page>
  )
}

export default Balance

const StyledHeader = styled.h2`
  position: absolute;
  top: 0;
  left: 0;
  padding: ${p => p.theme.paddingXL};
`

const StyledSummary = styled.h2`
  position: absolute;
  top: 0;
  right: 0;
  padding: ${p => p.theme.paddingXL};
`
