import React, { useContext } from "react"
import { RouteComponentProps } from "@reach/router"
import { useQuery } from "react-apollo-hooks"

import styled from "../../application/theme"
import { AppContext } from "../../application/context"

import { AllCosts } from "../../graphql/types"
import { GET_ALL_COSTS } from "../../graphql/costs/queries"

import Sidebar from "../../components/Sidebar"
import Page from "../../components/Page"
import CostItem from "../../components/CostItem"

function Costs(_: RouteComponentProps) {
  const { user } = useContext(AppContext)
  const { data, error } = useQuery<AllCosts.Query, AllCosts.Variables>(
    GET_ALL_COSTS,
    {
      variables: { houseId: user!.house!.id },
    },
  )
  return (
    <Page>
      <Sidebar active="costs" />
      <StyledCostList>
        <StyledHouseName>{user!.house!.name} costs</StyledHouseName>
        <StyledTableHeader>
          <StyledHeader align="left">Name</StyledHeader>
          <StyledHeader align="center">Amount</StyledHeader>
          <StyledHeader align="center">Payer</StyledHeader>
          <StyledHeader align="right">Date</StyledHeader>
        </StyledTableHeader>
        {data &&
          data.allCosts &&
          data.allCosts.map(cost => {
            return <CostItem key={cost.id} cost={cost} />
          })}
      </StyledCostList>
    </Page>
  )
}

export default Costs

const StyledCostList = styled.div`
  height: 100vh;
  width: 60%;
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
  padding: 0 ${p => p.theme.paddingL};
  ${p => p.theme.flexCenter};
`

const StyledHeader = styled.div<{ align: string }>`
  flex: 1;
  text-align: ${p => p.align};
  font-weight: ${p => p.theme.fontBlack};
`
