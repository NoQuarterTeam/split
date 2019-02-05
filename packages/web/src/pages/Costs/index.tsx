import React, { memo, useContext } from "react"
import { RouteComponentProps } from "@reach/router"
import { useQuery } from "react-apollo-hooks"

import styled from "../../application/theme"
import { AppContext } from "../../application/context"

import { AllCosts } from "../../graphql/types"
import { GET_ALL_COSTS } from "../../graphql/costs/queries"

import Sidebar from "../../components/Sidebar"
import Page from "../../components/Page"
import CostItem from "./CostItem"

function Costs(_: RouteComponentProps) {
  const { user } = useContext(AppContext)
  const { data, error } = useQuery<AllCosts.Query, AllCosts.Variables>(
    GET_ALL_COSTS,
    {
      variables: { houseId: user.house.id },
    },
  )
  return (
    <Page>
      <Sidebar active="costs" />
      <StyledCostList>
        <StyledHouseName>{user!.house.name} costs</StyledHouseName>
        <StyledTableHeader>
          <StyledHeader>Name</StyledHeader>
          <StyledHeader>Amount</StyledHeader>
          <StyledHeader>Payer</StyledHeader>
          <StyledHeader>Date</StyledHeader>
        </StyledTableHeader>
        {data &&
          data.allCosts.map(cost => {
            return <CostItem key={cost.id} cost={cost} />
          })}
      </StyledCostList>
    </Page>
  )
}

export default memo(Costs)

const StyledCostList = styled.div`
  flex: 1;
  height: 100vh;
  overflow-y: scroll;

  padding: ${p => p.theme.paddingXL} ${p => p.theme.paddingL};

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledHouseName = styled.h2`
  margin-bottom: ${p => p.theme.paddingXL};
`

const StyledTableHeader = styled.div`
  width: 100%;
  margin-bottom: ${p => p.theme.paddingL};
  ${p => p.theme.flexCenter};
`

const StyledHeader = styled.div`
  flex: 1;
  font-weight: ${p => p.theme.fontBlack};
`
