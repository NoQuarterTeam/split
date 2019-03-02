import React from "react"
import { RouteComponentProps, Redirect } from "@reach/router"

import { CostInput } from "../../lib/graphql/types"

import CostForm from "../../components/CostForm"

import useAppContext from "../../lib/hooks/useAppContext"
import { useCreateCostMutation } from "../../lib/graphql/costs/hooks"
import QuickPage from "../../components/QuickPage"

function NewCost(_: RouteComponentProps) {
  const { user } = useAppContext()
  if (!user.houseId) return <Redirect to="/" noThrow={true} />

  const createCost = useCreateCostMutation(user.houseId)

  const handleCreateCost = async (costData: CostInput) => {
    await createCost({
      variables: {
        data: costData,
      },
    })
    window.history.back()
  }

  return (
    <QuickPage title="New cost">
      <CostForm onFormSubmit={handleCreateCost} />
    </QuickPage>
  )
}

export default NewCost
