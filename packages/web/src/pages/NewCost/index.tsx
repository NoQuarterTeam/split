import React, { Fragment } from "react"
import { RouteComponentProps, Redirect } from "@reach/router"

import styled, { media } from "../../application/theme"
import IconClose from "../../assets/images/icon-close.svg"
import useEventListener from "../../lib/hooks/useEventListener"

import { CostInput } from "../../lib/graphql/types"

import CostForm from "../../components/CostForm"

import useUserContext from "../../lib/hooks/useUserContext"
import { useCreateCostMutation } from "../../lib/graphql/costs/hooks"

function NewCost(props: RouteComponentProps) {
  const user = useUserContext()
  if (!user.houseId) return <Redirect to="/" noThrow={true} />

  const handleCloseForm = (e: any) => {
    if (e.key === "Escape") handleGoBack()
  }
  useEventListener("keydown", handleCloseForm)

  const createCost = useCreateCostMutation(user.houseId)

  const handleCreateCost = (costData: CostInput) => {
    return createCost({
      variables: {
        data: costData,
      },
    }).then(() => {
      props.navigate!("/")
    })
  }

  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <Fragment>
      <StyledTopbar>
        <StyledHeader>New cost</StyledHeader>
        <StyledClose onClick={handleGoBack}>
          <img width={60} src={IconClose} alt="close" />
          Esc
        </StyledClose>
      </StyledTopbar>
      <CostForm onFormSubmit={handleCreateCost} />
    </Fragment>
  )
}

export default NewCost

const StyledTopbar = styled.div`
  padding: ${p => p.theme.paddingL};
  ${p => p.theme.flexBetween};

  ${p => media.greaterThan("sm")`
    padding: ${p.theme.paddingXL};
  `}
`

const StyledHeader = styled.h2`
  color: ${p => p.theme.colorHeader};
  font-size: ${p => p.theme.textXL};
  font-weight: ${p => p.theme.fontNormal};
`

const StyledClose = styled.div`
  color: lightgrey;
  flex-direction: column;
  cursor: pointer;
  ${p => p.theme.flexCenter};
  &:hover {
    opacity: 0.9;
  }
`
