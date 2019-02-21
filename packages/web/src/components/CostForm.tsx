import React, { useState, useEffect } from "react"
import dayjs from "dayjs"

import styled, { media } from "../application/theme"
import { CostInput, GetCost } from "../lib/graphql/types"

import Button from "./Button"
import useFormState from "../lib/hooks/useFormState"
import CostInputs from "./CostInputs"
import CostShares from "./CostShares"
import { splitTheBill, round } from "../lib/helpers"
import useUserContext from "../lib/hooks/useUserContext"
import { useGetHouseQuery } from "../lib/graphql/house/hooks"

type CostFormProps = {
  cost?: GetCost.GetCost
  onFormSubmit: (data: CostInput) => Promise<any>
  onCostDelete?: () => void
}

function CostForm({ cost, onFormSubmit, onCostDelete }: CostFormProps) {
  const user = useUserContext()
  const { house } = useGetHouseQuery()

  const { formState, setFormState } = useFormState<CostInput>({
    name: cost ? cost.name : "",
    amount: cost ? round(cost.amount * 0.01) : 0,
    category: cost ? cost.category : "",
    date: cost
      ? dayjs(cost.date).format("YYYY-MM-DD")
      : dayjs().format("YYYY-MM-DD"),
    recurring: cost ? cost.recurring : "one-off",
    houseId: house.id,
    payerId: cost ? cost.payerId : user.id,
    costShares: cost
      ? cost.shares.map(s => ({
          userId: s.user.id,
          amount: round(s.amount * 0.01),
        }))
      : house.users.map(u => ({ userId: u.id, amount: 0 })),
  })
  const [equalSplit, setEqualSplit] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const isDifferent =
    round(formState.amount) !==
    round(formState.costShares.reduce((acc, s) => acc + s.amount, 0))

  useEffect(() => {
    if (equalSplit) applyEqualSplit()
  }, [formState.amount, formState.costShares.length])

  const applyEqualSplit = () => {
    if (!equalSplit) setEqualSplit(true)
    const split = splitTheBill(formState.costShares.length, formState.amount)
    const costShares = formState.costShares.map(({ userId }, i) => ({
      userId,
      amount: split[i],
    }))
    setFormState({ costShares })
  }

  const handleCostCreate = async (e: any) => {
    e.preventDefault()
    if (isDifferent) return setError("Split not equal to amount")
    setLoading(true)
    const costData = {
      ...formState,
      date: dayjs(formState.date).format(),
      amount: round(formState.amount * 100),
      costShares: formState.costShares.map(s => ({
        userId: s.userId,
        amount: round(s.amount * 100),
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
          isDifferent={isDifferent}
          setFormState={setFormState}
          setEqualSplit={setEqualSplit}
          applyEqualSplit={applyEqualSplit}
        />
      </StyleFieldsWrapper>
      <div>
        <Button disabled={loading} loading={loading}>
          Submit
        </Button>
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
  padding: ${p => p.theme.paddingL};

  ${p => p.theme.flexBetween};

  ${p => media.greaterThan("sm")`
    padding: 0px 120px;
  `}
`

const StyleFieldsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
`
