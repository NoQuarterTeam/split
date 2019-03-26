import React, { FC } from "react"
import { RouteComponentProps, Redirect } from "@reach/router"
import { CostInput, useCreateCost } from "@split/connector"

import useAppContext from "../../lib/hooks/useAppContext"

import CostForm from "../../components/CostForm"
import QuickPage from "../../components/QuickPage"

const NewCost: FC<RouteComponentProps> = () => {
  const { user } = useAppContext()
  if (!user.houseId) return <Redirect to="/" noThrow={true} />

  const createCost = useCreateCost(user.houseId)

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
