import React, { memo } from "react"
import dayjs from "dayjs"
import { navigate } from "@reach/router"

import { AllCosts } from "../graphql/types"
import styled from "../application/theme"
import { round } from "../lib/helpers"

import IconOpen from "../assets/images/icon-open.svg"
import IconRepeat from "../assets/images/icon-repeat.svg"

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
      <Column flex={3}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {dayjs(cost.date).isAfter(dayjs().startOf("day")) && <div>fut</div>}
          {cost.recurring !== "one-off" && (
            <StyledIcon src={IconRepeat} width={30} />
          )}
          <StyledIcon src={IconOpen} width={10} />
        </div>
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
  border: 2px solid transparent;
  ${p => p.theme.flexCenter};

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 10px 5px rgba(200, 200, 200, 0.1);

    ${StyledIcon} {
      transition: 200ms all;
      transform: translateX(5px);
    }
  }
`
