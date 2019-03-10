import React, { useState, useEffect } from "react"
import dayjs from "dayjs"

import styled, { media } from "../application/theme"
import { CostInput, GetCost } from "../lib/graphql/types"
import { splitTheBill, round, sleep } from "../lib/helpers"

import useFormState from "../lib/hooks/useFormState"
import useAppContext from "../lib/hooks/useAppContext"
import Button from "./Button"
import CostInputs from "./CostInputs"
import CostShares from "./CostShares"
import ErrorBanner from "./ErrorBanner"

type CostFormProps = {
  cost?: GetCost.GetCost
  onFormSubmit: (data: CostInput) => Promise<any>
  onCostDelete?: () => void
}

function CostForm({ cost, onFormSubmit, onCostDelete }: CostFormProps) {
  const { user, house } = useAppContext()
  const { formState, setFormState } = useFormState<CostInput>({
    name: cost ? cost.name : "",
    amount: cost ? round(cost.amount * 0.01) : 0,
    category: cost ? cost.category : "food",
    equalSplit: cost ? cost.equalSplit : true,
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
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const isDifferent =
    round(formState.amount) !==
    round(formState.costShares.reduce((acc, s) => acc + s.amount, 0))

  useEffect(() => {
    if (isMounted && formState.equalSplit) applyEqualSplit()
    setIsMounted(true)
  }, [formState.amount, formState.costShares.length])

  const applyEqualSplit = () => {
    const split = splitTheBill(formState.costShares.length, formState.amount)
    const costShares = formState.costShares.map(({ userId }, i) => ({
      userId,
      amount: split[i],
    }))
    setFormState({ costShares, equalSplit: true })
  }

  const handleCostCreate = async (e: any) => {
    e.preventDefault()
    if (isDifferent) return
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
    onFormSubmit(costData).catch(async () => {
      setError("Oops, something went wrong, we have been notified!")
      await sleep(4000)
      setError(null)
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
          formState={formState}
          isDifferent={isDifferent}
          setFormState={setFormState}
          applyEqualSplit={applyEqualSplit}
        />
      </StyleFieldsWrapper>
      <div>
        <Button disabled={loading} loading={loading}>
          Submit
        </Button>
        {onCostDelete && (
          <Button
            type="button"
            color="pink"
            variant="tertiary"
            onClick={onCostDelete}
          >
            Delete cost
          </Button>
        )}
      </div>
      {error && <ErrorBanner text={error} />}
    </StyledForm>
  )
}

export default CostForm

const StyledForm = styled.form`
  flex-wrap: wrap;
  padding: ${p => p.theme.paddingL};

  ${p => p.theme.flexBetween};

  ${p => media.greaterThan("md")`
    padding: 40px 120px;
  `}
`

const StyleFieldsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
`
