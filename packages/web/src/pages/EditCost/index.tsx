import React, { useContext } from "react"
import { RouteComponentProps, Redirect } from "@reach/router"
import { useQuery, useMutation } from "react-apollo-hooks"

import styled from "../../application/theme"
import IconClose from "../../assets/images/icon-close.svg"
import {
  GetCost,
  CostInput,
  EditCost,
  DestroyCost,
} from "../../lib/graphql/types"
import {
  GET_COST,
  EDIT_COST,
  GET_ALL_COSTS,
  DESTROY_COST,
} from "../../lib/graphql/costs/queries"
import { GET_HOUSE } from "../../lib/graphql/house/queries"
import useEventListener from "../../lib/hooks/useEventListener"

import CostForm from "../../components/CostForm"
import { AppContext } from "../../application/context"

interface EditCostProps extends RouteComponentProps {
  id?: string
}

function EditCostPage(props: EditCostProps) {
  const { user } = useContext(AppContext)
  const house = user!.houseId
  if (!house) return <Redirect to="/" noThrow={true} />

  const { data: cost, error } = useQuery<GetCost.Query, GetCost.Variables>(
    GET_COST,
    {
      variables: { costId: props.id! },
    },
  )
  if (error) return <Redirect to="/costs" noThrow={true} />

  const handleCloseForm = (e: any) => {
    if (e.key === "Escape") handleGoBack()
  }
  useEventListener("keydown", handleCloseForm)

  const editCost = useMutation<EditCost.Mutation, EditCost.Variables>(EDIT_COST)

  const destroyCost = useMutation<DestroyCost.Mutation, DestroyCost.Variables>(
    DESTROY_COST,
  )

  const handleEditCost = (costData: CostInput) => {
    return editCost({
      variables: {
        costId: cost!.getCost.id,
        data: costData,
      },
      refetchQueries: [
        { query: GET_HOUSE },
        { query: GET_ALL_COSTS, variables: { houseId: cost!.getCost.houseId } },
      ],
      awaitRefetchQueries: true,
    }).then(() => {
      props.navigate!("/costs")
    })
  }

  const handleDeleteCost = () => {
    return destroyCost({
      variables: {
        costId: cost!.getCost.id,
      },
      refetchQueries: [
        { query: GET_HOUSE },
        { query: GET_ALL_COSTS, variables: { houseId: cost!.getCost.houseId } },
      ],
      awaitRefetchQueries: true,
    }).then(() => {
      props.navigate!("/costs")
    })
  }

  const handleGoBack = () => {
    window.history.back()
  }
  return (
    <div>
      <StyledTopbar>
        <StyledHeader>Edit cost</StyledHeader>
        <StyledClose onClick={handleGoBack}>
          <img width={60} src={IconClose} alt="close" />
          Esc
        </StyledClose>
      </StyledTopbar>
      <CostForm
        cost={cost!.getCost}
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
