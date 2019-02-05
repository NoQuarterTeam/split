import React, { memo } from "react"
import { AllCosts } from "../../graphql/types"
import styled from "../../application/theme"
import dayjs from "dayjs"
import { navigate } from "@reach/router"

type CostProps = {
  cost: AllCosts.AllCosts
}

function CostItem({ cost }: CostProps) {
  return (
    <StyledCost onClick={() => navigate(`/costs/${cost.id}`)} tabIndex={0}>
      <StyledCostItem>{cost.name}</StyledCostItem>
      <StyledCostItem>€ {cost.amount * 0.01}</StyledCostItem>
      <StyledCostItem>{cost.payer.firstName}</StyledCostItem>
      <StyledCostItem>{dayjs(cost.date).format("DD MMM 'YY")}</StyledCostItem>
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

const StyledCostItem = styled.div`
  flex: 1;
`
