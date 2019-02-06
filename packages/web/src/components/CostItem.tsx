import React, { memo } from "react"
import { AllCosts } from "../graphql/types"
import styled from "../application/theme"
import dayjs from "dayjs"
import { navigate } from "@reach/router"

type CostProps = {
  cost: AllCosts.AllCosts
}

function CostItem({ cost }: CostProps) {
  return (
    <StyledCost onClick={() => navigate(`/costs/${cost.id}`)} tabIndex={0}>
      <StyledCostItem align="left">{cost.name}</StyledCostItem>
      <StyledCostItem align="center">€ {cost.amount * 0.01}</StyledCostItem>
      <StyledCostItem align="center">{cost.payer.firstName}</StyledCostItem>
      <StyledCostItem align="right">
        {dayjs(cost.date).format("DD MMM 'YY")}
      </StyledCostItem>
    </StyledCost>
  )
}

export default memo(CostItem)

const StyledCost = styled.div`
  width: 100%;
  padding: ${p => p.theme.paddingL};
  border-radius: ${p => p.theme.borderRadius};
  ${p => p.theme.flexCenter};

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 20px 5px rgba(150, 150, 150, 0.1);
  }
`

const StyledCostItem = styled.div<{ align: string }>`
  flex: 1;
  text-align: ${p => p.align};
`
