import React, { memo } from "react"
import { RouteComponentProps, Link, navigate } from "@reach/router"
import { useMutation } from "react-apollo-hooks"

import styled from "../../application/theme"
import IconClose from "../../assets/images/icon-close.svg"
import useEventListener from "../../hooks/useEventListener"

import { CREATE_COST, GET_ALL_COSTS } from "../../graphql/costs/queries"
import { CreateCost, CostInput } from "../../graphql/types"
import { GET_HOUSE } from "../../graphql/house/queries"

import CostForm from "../../components/CostForm"

function NewCost(_: RouteComponentProps) {
  const handleCloseForm = (e: any) => {
    if (e.key === "Escape") navigate("/")
  }
  useEventListener("keydown", handleCloseForm)

  const createCost = useMutation<CreateCost.Mutation, CreateCost.Variables>(
    CREATE_COST,
    {
      awaitRefetchQueries: true,
    },
  )

  const handleCreateCost = (costData: CostInput) => {
    return createCost({
      variables: {
        data: costData,
      },
      refetchQueries: [
        { query: GET_HOUSE },
        { query: GET_ALL_COSTS, variables: { houseId: costData.houseId } },
      ],
    }).then(() => {
      navigate("/")
    })
  }

  return (
    <div>
      <StyledTopbar>
        <StyledHeader>New cost</StyledHeader>
        <Link to="/" tabIndex={-1}>
          <StyledClose>
            <StyledIcon src={IconClose} alt="close" />
            Esc
          </StyledClose>
        </Link>
      </StyledTopbar>
      <CostForm onFormSubmit={handleCreateCost} />
    </div>
  )
}

export default NewCost

const StyledTopbar = styled.div`
  padding: ${p => p.theme.paddingXL};
  ${p => p.theme.flexBetween};
`

const StyledHeader = styled.h2`
  color: ${p => p.theme.colorHeader};
  font-size: ${p => p.theme.textXL};
  font-weight: ${p => p.theme.fontNormal};
`

const StyledClose = styled.div`
  color: lightgrey;
  flex-direction: column;
  ${p => p.theme.flexCenter};
`

const StyledIcon = styled.img`
  width: 60px;
  &:hover {
    opacity: 0.9;
  }
`
