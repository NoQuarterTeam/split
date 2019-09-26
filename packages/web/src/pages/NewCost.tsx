import React, { FC } from "react"
import { RouteComponentProps, Redirect, navigate } from "@reach/router"

import useAppContext from "../lib/hooks/useAppState"

import CostForm from "../components/CostForm"
import QuickPage from "../components/QuickPage"
import { useCreateCost } from "../lib/graphql/cost/hooks"
import { CostInput } from "../lib/graphql/types"

const NewCost: FC<RouteComponentProps> = () => {
  const { user } = useAppContext()
  if (!user.groupId) return <Redirect to="/" noThrow={true} />

  const [createCost] = useCreateCost(user.groupId)

  const handleCreateCost = async (costData: CostInput) => {
    await createCost({
      variables: {
        data: costData,
      },
    })
    if (window.history.state) {
      window.history.back()
    } else {
      navigate("/")
    }
  }

  return (
    <QuickPage title="New cost">
      <CostForm onFormSubmit={handleCreateCost} />
    </QuickPage>
  )
}

export default NewCost
