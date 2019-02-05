import React, { memo, useState, useContext, useEffect } from "react"
import dayjs from "dayjs"
import { useQuery } from "react-apollo-hooks"

import styled from "../application/theme"
import { AppContext } from "../application/context"
import { GetHouse, CostInput, Cost } from "../graphql/types"
import { GET_HOUSE } from "../graphql/house/queries"

import Button from "./Button"
import useFormState from "../hooks/useFormState"
import CostInputs from "./CostInputs"
import CostShares from "./CostShares"
import { round } from "../lib/helpers"

type CostFormProps = {
  cost?: Cost.Fragment
  onFormSubmit: (data: CostInput) => Promise<any>
}

function CostForm({ cost, onFormSubmit }: CostFormProps) {
  const context = useContext(AppContext)
  const { data } = useQuery<GetHouse.Query>(GET_HOUSE)

  const { formState, setFormState } = useFormState<CostInput>({
    name: cost ? cost.name : "",
    amount: cost ? cost.amount * 0.01 : 0,
    category: cost ? cost.category : "",
    date: cost
      ? dayjs(cost.date).format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD"),
    recurring: cost ? cost.recurring : "one-off",
    houseId: cost ? cost.houseId : context.user!.house.id,
    payerId: cost ? cost.payer.id : context.user.id,
    costShares: cost
      ? cost.shares.map(s => ({ userId: s.user.id, amount: s.amount * 0.01 }))
      : data!.house.users.map(u => ({ userId: u.id, amount: 0 })),
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
    const amountPerUser = round(
      formState.amount / formState.costShares.length,
      2,
    )
    const costShares = formState.costShares.map(({ userId }) => ({
      userId,
      amount: amountPerUser,
    }))
    setFormState({ costShares })
  }

  const handleCreateHouseSubmit = async (e: any) => {
    e.preventDefault()
    if (difference) {
      return setError("Split not equal to amount")
    }
    setLoading(true)

    const data = {
      ...formState,
      amount: round(formState.amount * 100, 0),
      costShares: formState.costShares.map(s => ({
        userId: s.userId,
        amount: round(s.amount * 100, 0),
      })),
    }
    onFormSubmit(data).catch(e => {
      setError(e.message)
      setLoading(false)
    })
  }

  return (
    <StyledForm onSubmit={handleCreateHouseSubmit}>
      <StyleFieldsWrapper>
        <CostInputs formState={formState} setFormState={setFormState} />
        <CostShares
          users={data!.house.users}
          equalSplit={equalSplit}
          formState={formState}
          difference={difference}
          setFormState={setFormState}
          setEqualSplit={setEqualSplit}
          applyEqualSplit={applyEqualSplit}
        />
      </StyleFieldsWrapper>

      <Button loading={loading}>Submit</Button>
      {error && <p>{error}</p>}
    </StyledForm>
  )
}

export default memo(CostForm)

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
