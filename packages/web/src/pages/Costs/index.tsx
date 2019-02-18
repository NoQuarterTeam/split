import React, { Fragment } from "react"
import { RouteComponentProps, Link, Redirect } from "@reach/router"

import styled from "../../application/theme"
import IconPlus from "../../assets/images/icon-plus.svg"
import Page from "../../components/Page"
import CostItem from "../../components/CostItem"
import Column from "../../components/styled/Column"
import { useHouseQuery } from "../../lib/graphql/house/hooks"
import useUserContext from "../../lib/hooks/useUserContext"
import { useAllCostsQuery } from "../../lib/graphql/costs/hooks"

function Costs(_: RouteComponentProps) {
  const user = useUserContext()
  if (!user.houseId) return <Redirect to="/" noThrow={true} />

  const { house } = useHouseQuery()
  const { costs } = useAllCostsQuery(house.id)

  return (
    <Page activePage="costs">
      <Fragment>
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
            <Column flex={3} />
          </StyledTableHeader>
          {costs.map(cost => {
            return <CostItem key={cost.id} cost={cost} />
          })}
        </StyledCostList>
      </Fragment>
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
