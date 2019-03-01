import React from "react"
import { RouteComponentProps, Link, Redirect } from "@reach/router"

import styled, { media } from "../../application/theme"
import IconPlus from "../../assets/images/icon-plus.svg"
import useAppContext from "../../lib/hooks/useAppContext"

import Page from "../../components/Page"
import CostList from "../../components/CostList"

function Costs(_: RouteComponentProps) {
  const { user } = useAppContext()
  if (!user.houseId) return <Redirect to="/" noThrow={true} />

  return (
    <Page activePage="costs">
      <StyledCostPage>
        <StyledHeader>
          <StyledTitle>Costs</StyledTitle>
          <Link to="/new-cost">
            <img src={IconPlus} alt="add" height={40} />
          </Link>
        </StyledHeader>
        <CostList />
      </StyledCostPage>
    </Page>
  )
}

export default Costs

const StyledCostPage = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  padding: ${p => p.theme.paddingL};

  ${p => media.greaterThan("md")`
    padding-top: ${p.theme.paddingXL};
  `}
`

const StyledHeader = styled.div`
  width: 100%;
  margin-bottom: ${p => p.theme.paddingXL};
  padding-left: 75px;
  ${p => p.theme.flexBetween};

  ${media.greaterThan("sm")`
    padding-left: 0;
  `}
`

const StyledTitle = styled.h2`
  color: ${p => p.theme.colorHeader};
  font-size: ${p => p.theme.textL};
  font-weight: normal;
`
