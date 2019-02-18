import React from "react"
import { RouteComponentProps, Redirect } from "@reach/router"

import styled from "../../application/theme"
import IconClose from "../../assets/images/icon-close.svg"
import { CostInput } from "../../lib/graphql/types"
import useEventListener from "../../lib/hooks/useEventListener"

import CostForm from "../../components/CostForm"
import useUserContext from "../../lib/hooks/useUserContext"
import {
  useGetCostQuery,
  useEditCostMutation,
  useDestroyCostMutation,
} from "../../lib/graphql/costs/hooks"

interface EditCostProps extends RouteComponentProps {
  id?: string
}

function EditCostPage(props: EditCostProps) {
  const user = useUserContext()
  if (!user.houseId) return <Redirect to="/" noThrow={true} />

  const { cost } = useGetCostQuery(props.id!)

  const editCost = useEditCostMutation(cost.houseId)

  const destroyCost = useDestroyCostMutation(cost.houseId)

  const handleCloseForm = (e: any) => {
    if (e.key === "Escape") handleGoBack()
  }
  useEventListener("keydown", handleCloseForm)

  const handleEditCost = (costData: CostInput) => {
    return editCost({
      variables: {
        costId: cost.id,
        data: costData,
      },
    }).then(() => {
      props.navigate!("/costs")
    })
  }

  const handleDeleteCost = () => {
    return destroyCost({
      variables: {
        costId: cost.id,
      },
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
        cost={cost}
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
