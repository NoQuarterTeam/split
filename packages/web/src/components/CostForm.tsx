import React, { useState, useContext, useEffect } from "react"
import dayjs from "dayjs"
import { useQuery } from "react-apollo-hooks"

import styled from "../application/theme"
import { AppContext } from "../application/context"
import { GetHouse, CostInput, GetCost } from "../graphql/types"
import { GET_HOUSE } from "../graphql/house/queries"

import Button from "./Button"
import useFormState from "../hooks/useFormState"
import CostInputs from "./CostInputs"
import CostShares from "./CostShares"
import { round } from "../lib/helpers"

type CostFormProps = {
  cost?: GetCost.GetCost
  onFormSubmit: (data: CostInput) => Promise<any>
  onCostDelete?: () => void
}

function CostForm({ cost, onFormSubmit, onCostDelete }: CostFormProps) {
  const { user } = useContext(AppContext)
  const { data } = useQuery<GetHouse.Query>(GET_HOUSE)
  const house = data!.house!

  const { formState, setFormState } = useFormState<CostInput>({
    name: cost ? cost.name : "",
    amount: cost ? cost.amount * 0.01 : 0,
    category: cost ? cost.category : "",
    date: cost
      ? dayjs(cost.date).format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD"),
    recurring: cost ? cost.recurring : "one-off",
    houseId: house.id,
    payerId: cost ? cost.payerId : user!.id,
    costShares: cost
      ? cost.shares.map(s => ({ userId: s.user.id, amount: s.amount * 0.01 }))
      : house.users.map(u => ({ userId: u.id, amount: 0 })),
  })
  const [equalSplit, setEqualSplit] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const difference =
    formState.amount !==
    formState.costShares.reduce((acc, s) => acc + s.amount, 0)

  useEffect(() => {
    if (equalSplit) {
      applyEqualSplit()
    }
  }, [formState.amount, formState.costShares.length])

  const applyEqualSplit = () => {
    if (!equalSplit) {
      setEqualSplit(true)
    }
    const amountPerUser = formState.amount / formState.costShares.length

    const costShares = formState.costShares.map(({ userId }) => ({
      userId,
      amount: amountPerUser,
    }))
    setFormState({ costShares })
  }

  const handleCostCreate = async (e: any) => {
    e.preventDefault()
    if (difference) {
      return setError("Split not equal to amount")
    }
    setLoading(true)

    const costData = {
      ...formState,
      date: dayjs(formState.date).format(),
      amount: round(formState.amount * 100, 0),
      costShares: formState.costShares.map(s => ({
        userId: s.userId,
        amount: round(s.amount * 100, 0),
      })),
    }
    onFormSubmit(costData).catch(houseError => {
      setError(houseError.message)
      setLoading(false)
    })
  }

  return (
    <StyledForm onSubmit={handleCostCreate}>
      <StyleFieldsWrapper>
        <CostInputs
          formState={formState}
          setFormState={setFormState}
          isEditing={!!cost && dayjs(cost.date).isBefore(dayjs())}
        />
        <CostShares
          users={house.users}
          equalSplit={equalSplit}
          formState={formState}
          difference={difference}
          setFormState={setFormState}
          setEqualSplit={setEqualSplit}
          applyEqualSplit={applyEqualSplit}
        />
      </StyleFieldsWrapper>

      <div>
        <Button loading={loading}>Submit</Button>
        {onCostDelete && (
          <Button type="button" variant="secondary" onClick={onCostDelete}>
            Delete cost
          </Button>
        )}
      </div>
      {error && <p>{error}</p>}
    </StyledForm>
  )
}

export default CostForm

const StyledForm = styled.form`
  flex-wrap: wrap;
  padding: 0px 120px;

  ${p => p.theme.flexBetween};
`

const StyleFieldsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`
