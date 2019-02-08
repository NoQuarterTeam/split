import React, { useContext } from "react"
import { RouteComponentProps } from "@reach/router"
import { useQuery } from "react-apollo-hooks"

import styled from "../../application/theme"
import { AppContext } from "../../application/context"

import { AllCosts } from "../../graphql/types"
import { GET_ALL_COSTS } from "../../graphql/costs/queries"

import Page from "../../components/Page"
import CostItem from "../../components/CostItem"
import Column from "../../components/Column"

function Costs(_: RouteComponentProps) {
  const { user } = useContext(AppContext)
  const { data, error } = useQuery<AllCosts.Query, AllCosts.Variables>(
    GET_ALL_COSTS,
    {
      variables: { houseId: user!.house!.id },
    },
  )
  return (
    <Page activePage="costs">
      <StyledCostList>
        <StyledHouseName>{user!.house!.name} costs</StyledHouseName>
        <StyledTableHeader>
          <Column flex={5}>
            <StyledHeader>Name</StyledHeader>
          </Column>
          <Column flex={5}>
            <StyledHeader>Amount</StyledHeader>
          </Column>
          <Column flex={5}>
            <StyledHeader>Payer</StyledHeader>
          </Column>
          <Column flex={5}>
            <StyledHeader>Date</StyledHeader>
          </Column>
          <Column flex={1} />
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
  width: 75%;
  overflow-y: scroll;

  padding: ${p => p.theme.paddingXL};

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledHouseName = styled.h2`
  margin-bottom: ${p => p.theme.paddingXL};
  color: ${p => p.theme.colorHeader};
`

const StyledTableHeader = styled.div`
  width: 100%;
  margin-bottom: ${p => p.theme.paddingL};
  padding: ${p => `${p.theme.paddingM} ${p.theme.paddingL}`};
  padding-right: 0;
  border-radius: ${p => p.theme.borderRadius};
  background-color: ${p => p.theme.colorLightGrey};
  ${p => p.theme.flexCenter};
`

const StyledHeader = styled.div`
  text-transform: uppercase;
  letter-spacing: 1px;
  color: grey;
  font-size: ${p => p.theme.textXS};
  font-weight: ${p => p.theme.fontBlack};
`
