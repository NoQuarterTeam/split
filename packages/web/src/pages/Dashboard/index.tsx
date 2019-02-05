import React, { memo, useContext } from "react"
import { RouteComponentProps } from "@reach/router"
import { useQuery } from "react-apollo-hooks"

import styled from "../../application/theme"
import { AppContext } from "../../application/context"

import { GetHouse } from "../../graphql/types"
import { GET_HOUSE } from "../../graphql/house/queries"

import Sidebar from "../../components/Sidebar"
import Page from "../../components/Page"

import HouseBalance from "./HouseBalance"
import { round } from "../../lib/helpers"

function Dashboard(_: RouteComponentProps) {
  const { user } = useContext(AppContext)
  const { data, error } = useQuery<GetHouse.Query>(GET_HOUSE)

  const getBalanceHeader = () => {
    if (user.balance > 0) {
      return `You are owed €${round(user.balance * 0.01, 2)}`
    } else {
      return `You owe €${round(Math.abs(user.balance * 0.01), 2)}`
    }
  }
  return (
    <Page>
      <Sidebar active="dashboard" />
      <HouseBalance users={data!.house.users} />
      <StyledSummary>{getBalanceHeader()}</StyledSummary>
    </Page>
  )
}

export default memo(Dashboard)

const StyledSummary = styled.h2`
  height: 100%;
  width: 300px;
  text-align: center;
  padding: ${p => p.theme.paddingL};
  padding-top: ${p => p.theme.paddingXL};
`
