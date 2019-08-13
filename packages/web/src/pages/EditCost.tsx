import React, { FC } from "react"
import { RouteComponentProps, Redirect, navigate } from "@reach/router"

import useAppContext from "../lib/hooks/useAppState"

import CostForm from "../components/CostForm"
import QuickPage from "../components/QuickPage"
import {
  useGetCost,
  useEditCost,
  useDestroyCost,
} from "../lib/graphql/cost/hooks"
import { CostInput } from "../lib/graphql/types"

interface EditCostProps extends RouteComponentProps {
  id?: string
}

const EditCostPage: FC<EditCostProps> = props => {
  const { user } = useAppContext()
  if (!user.houseId || !props.id) return <Redirect to="/" noThrow={true} />

  const { cost } = useGetCost(props.id)

  const [editCost] = useEditCost(cost && cost.houseId)
  const [destroyCost] = useDestroyCost(cost)

  const handleEditCost = async (costData: CostInput) => {
    if (cost) {
      await editCost({
        variables: {
          costId: cost.id,
          data: costData,
        },
      })
      navigate("/costs")
    }
  }

  const handleDeleteCost = async () => {
    await destroyCost()
    navigate("/costs")
  }

  return (
    <QuickPage title="Edit cost">
      {cost && (
        <CostForm
          cost={cost}
          onFormSubmit={handleEditCost}
          onCostDelete={handleDeleteCost}
        />
      )}
    </QuickPage>
  )
}

export default EditCostPage
