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

function Dashboard(_: RouteComponentProps) {
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
    <Page activePage="dashboard">
      <StyledContent>
        <HouseBalance users={data!.house.users} />
      </StyledContent>
      <StyledSummary>{getBalanceHeader()}</StyledSummary>
    </Page>
  )
}

export default Dashboard

const StyledContent = styled.div`
  height: 100%;
  margin: 0 auto;
  ${p => p.theme.flexCenter};
`
const StyledSummary = styled.h2`
  height: 100%;
  width: 300px;
  text-align: center;
  padding: ${p => p.theme.paddingL};
  padding-top: ${p => p.theme.paddingXL};
`
