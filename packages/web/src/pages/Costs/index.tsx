import React from "react"
import { RouteComponentProps, Link, Redirect } from "@reach/router"

import styled, { media } from "../../application/theme"
import IconPlus from "../../assets/images/icon-plus.svg"
import useAppContext from "../../lib/hooks/useAppContext"

import Page from "../../components/Page"
import Column from "../../components/styled/Column"
import CostList from "../../components/CostList"

function Costs(_: RouteComponentProps) {
  const { user, house } = useAppContext()
  if (!user.houseId) return <Redirect to="/" noThrow={true} />

  return (
    <Page activePage="costs">
      <StyledCostPage>
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
        {house && <CostList house={house} />}
      </StyledCostPage>
    </Page>
  )
}

export default Costs

const StyledCostPage = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  padding: ${p => p.theme.paddingL};
  padding-top: ${p => p.theme.paddingXL};
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
  padding: ${p => p.theme.paddingM};
  padding-right: 0;
  border-radius: ${p => p.theme.borderRadius};
  background-color: ${p => p.theme.colorLightGrey};
  ${p => p.theme.flexCenter};

  ${p => media.greaterThan("sm")`
    padding: ${`${p.theme.paddingM} ${p.theme.paddingL}`};
  `}
`

const StyledLabel = styled.div`
  text-transform: uppercase;
  letter-spacing: 1px;
  color: grey;
  font-size: ${p => p.theme.textXS};
  font-weight: ${p => p.theme.fontBlack};
`
