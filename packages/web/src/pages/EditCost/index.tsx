import React, { FC } from "react"
import { RouteComponentProps, Redirect, navigate } from "@reach/router"
import {
  useGetCost,
  useEditCost,
  useDestroyCost,
  CostInput,
} from "@split/connector"

import useAppContext from "../../lib/hooks/useAppContext"

import CostForm from "../../components/CostForm"
import QuickPage from "../../components/QuickPage"

interface EditCostProps extends RouteComponentProps {
  id?: string
}

const EditCostPage: FC<EditCostProps> = props => {
  const { user } = useAppContext()
  if (!user.houseId || !props.id) return <Redirect to="/" noThrow={true} />

  const { cost } = useGetCost(props.id)
  if (!cost) return <Redirect to="/" noThrow={true} />

  const editCost = useEditCost(cost.houseId)
  const destroyCost = useDestroyCost(cost)

  const handleEditCost = async (costData: CostInput) => {
    await editCost({
      variables: {
        costId: cost.id,
        data: costData,
      },
    })
    navigate("/costs")
  }

  const handleDeleteCost = async () => {
    await destroyCost()
    navigate("/costs")
  }

  return (
    <QuickPage title="Edit cost">
      <CostForm
        cost={cost}
        onFormSubmit={handleEditCost}
        onCostDelete={handleDeleteCost}
      />
    </QuickPage>
  )
}

export default EditCostPage
