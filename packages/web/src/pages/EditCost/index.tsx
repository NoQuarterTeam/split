import React from "react"
import { RouteComponentProps, Redirect } from "@reach/router"

import { CostInput } from "../../lib/graphql/types"

import CostForm from "../../components/CostForm"
import useAppContext from "../../lib/hooks/useAppContext"
import {
  useGetCostQuery,
  useEditCostMutation,
  useDestroyCostMutation,
} from "../../lib/graphql/costs/hooks"
import QuickPage from "../../components/QuickPage"

interface EditCostProps extends RouteComponentProps {
  id?: string
}

function EditCostPage(props: EditCostProps) {
  const { user } = useAppContext()
  if (!user.houseId) return <Redirect to="/" noThrow={true} />

  const { cost } = useGetCostQuery(props.id!)
  if (!cost) return null

  const editCost = useEditCostMutation()
  const destroyCost = useDestroyCostMutation(cost)

  const handleEditCost = async (costData: CostInput) => {
    await editCost({
      variables: {
        costId: cost.id,
        data: costData,
      },
    })
    props.navigate!("/costs")
  }

  const handleDeleteCost = async () => {
    await destroyCost()
    props.navigate!("/costs")
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
