import React, { useContext } from "react"
import { RouteComponentProps, Link } from "@reach/router"
import { useQuery } from "react-apollo-hooks"

import styled from "../../application/theme"
import { AppContext } from "../../application/context"

import { AllCosts } from "../../graphql/types"
import { GET_ALL_COSTS } from "../../graphql/costs/queries"
import IconPlus from "../../assets/images/icon-plus.svg"
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
        <StyledHeader>
          <StyledHouseName>Costs</StyledHouseName>
          <Link to="/new-cost">
            <img src={IconPlus} alt="add" height={40} />
          </Link>
        </StyledHeader>
        <StyledTableHeader>
          <Column flex={5}>
            <StyledLabel>Name</StyledLabel>
          </Column>
          <Column flex={5}>
            <StyledLabel>Amount</StyledLabel>
          </Column>
          <Column flex={5}>
            <StyledLabel>Payer</StyledLabel>
          </Column>
          <Column flex={5}>
            <StyledLabel>Date</StyledLabel>
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
  width: 80%;
  overflow-y: scroll;

  padding: ${p => p.theme.paddingXL};

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledHeader = styled.div`
  width: 100%;
  margin-bottom: ${p => p.theme.paddingXL};
  ${p => p.theme.flexBetween};
`

const StyledHouseName = styled.h2`
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

const StyledLabel = styled.div`
  text-transform: uppercase;
  letter-spacing: 1px;
  color: grey;
  font-size: ${p => p.theme.textXS};
  font-weight: ${p => p.theme.fontBlack};
`
