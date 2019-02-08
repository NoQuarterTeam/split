import React, { memo } from "react"
import dayjs from "dayjs"
import { navigate } from "@reach/router"

import { AllCosts } from "../graphql/types"
import styled from "../application/theme"
import { round } from "../lib/helpers"

import IconOpen from "../assets/images/icon-open.svg"
import Column from "./Column"
import Avatar from "./Avatar"

type CostProps = {
  cost: AllCosts.AllCosts
}

function CostItem({ cost }: CostProps) {
  return (
    <StyledCost onClick={() => navigate(`/costs/${cost.id}`)} tabIndex={0}>
      <Column flex={5}>{cost.name}</Column>
      <Column flex={5}>€ {round(cost.amount * 0.01, 2)}</Column>
      <Column flex={5}>
        <Avatar user={cost.payer} size={40} />
      </Column>
      <Column flex={5}>{dayjs(cost.date).format("DD MMM 'YY")}</Column>
      <Column flex={1}>
        <StyledIcon src={IconOpen} width={10} />
      </Column>
    </StyledCost>
  )
}

export default memo(CostItem)

const StyledIcon = styled.img``

const StyledCost = styled.div`
  width: 100%;
  padding: ${p => p.theme.paddingL};
  padding-right: 0;
  border-radius: ${p => p.theme.borderRadius};
  ${p => p.theme.flexCenter};

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 20px 5px rgba(150, 150, 150, 0.1);

    ${StyledIcon} {
      transition: 200ms all;
      transform: translateX(5px);
    }
  }
`
