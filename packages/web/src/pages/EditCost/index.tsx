import React from "react"
import { RouteComponentProps, Link, navigate, Redirect } from "@reach/router"
import { useQuery, useMutation } from "react-apollo-hooks"

import styled from "../../application/theme"
import IconClose from "../../assets/images/icon-close.svg"
import useEventListener from "../../hooks/useEventListener"

import { GetCost, CostInput, EditCost, DestroyCost } from "../../graphql/types"
import {
  GET_COST,
  EDIT_COST,
  GET_ALL_COSTS,
  DESTROY_COST,
} from "../../graphql/costs/queries"

import CostForm from "../../components/CostForm"
import { GET_HOUSE } from "../../graphql/house/queries"

interface EditCostProps extends RouteComponentProps {
  id?: string
}

function EditCostPage(props: EditCostProps) {
  const { id } = props
  const { data, error } = useQuery<GetCost.Query, GetCost.Variables>(GET_COST, {
    variables: { costId: id! },
  })

  const handleCloseForm = (e: any) => {
    if (e.key === "Escape") navigate("/costs")
  }
  useEventListener("keydown", handleCloseForm)

  if (error) return <Redirect to="/costs" noThrow />

  const editCost = useMutation<EditCost.Mutation, EditCost.Variables>(
    EDIT_COST,
    {
      refetchQueries: [
        { query: GET_HOUSE },
        { query: GET_ALL_COSTS, variables: { houseId: data!.getCost.houseId } },
        { query: GET_COST, variables: { costId: data!.getCost.id } },
      ],
      awaitRefetchQueries: true,
    },
  )

  const destroyCost = useMutation<DestroyCost.Mutation, DestroyCost.Variables>(
    DESTROY_COST,
    {
      refetchQueries: [
        { query: GET_HOUSE },
        { query: GET_ALL_COSTS, variables: { houseId: data!.getCost.houseId } },
      ],
      awaitRefetchQueries: true,
    },
  )

  const handleEditCost = (costData: CostInput) => {
    return editCost({
      variables: {
        costId: data!.getCost.id,
        data: costData,
      },
    }).then(() => {
      navigate("/costs")
    })
  }

  const handleDeleteCost = () => {
    return destroyCost({
      variables: {
        costId: data!.getCost.id,
      },
    }).then(() => {
      navigate("/costs")
    })
  }

  return (
    <div>
      <StyledTopbar>
        <StyledHeader>Edit cost</StyledHeader>
        <Link to="/costs" tabIndex={-1}>
          <StyledClose>
            <StyledIcon src={IconClose} alt="close" />
            Esc
          </StyledClose>
        </Link>
      </StyledTopbar>
      <CostForm
        cost={data!.getCost}
        onFormSubmit={handleEditCost}
        onCostDelete={handleDeleteCost}
      />
    </div>
  )
}

export default EditCostPage

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
