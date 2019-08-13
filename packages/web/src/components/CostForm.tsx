import React, { useLayoutEffect, useState } from "react"
import dayjs from "dayjs"
import { Button, styled } from "@noquarter/ui"
import { round, sleep } from "@noquarter/utils"
import { splitTheBill } from "../lib/helpers"
import { media } from "../application/theme"
import useAppContext from "../lib/hooks/useAppState"
import useFormState from "../lib/hooks/useFormState"
import CostInputs from "./CostInputs"
import CostShares from "./CostShares"
import ErrorBanner from "./ErrorBanner"
import { GetCostQuery, CostInput } from "../lib/graphql/types"

interface CostFormProps {
  cost?: GetCostQuery["getCost"]
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
      ? cost.shares
          .filter(s => s.amount > 0)
          .map(s => ({
            userId: s.user.id,
            amount: round(s.amount * 0.01),
          }))
      : house.users.map(u => ({ userId: u.id, amount: 0 })),
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const isDifferent =
    round(formState.amount) !== round(formState.costShares.sumBy("amount"))

  const applyEqualSplit = () => {
    const split = splitTheBill(formState.costShares.length, formState.amount)
    const costShares = formState.costShares.map(({ userId }, i) => ({
      userId,
      amount: split[i],
    }))
    setFormState({ costShares, equalSplit: true })
  }

  useLayoutEffect(() => {
    if (formState.equalSplit) applyEqualSplit()
  }, [formState.amount, formState.costShares.length])

  const handleCostCreate = async (e: any) => {
    e.preventDefault()
    if (isDifferent) return
    setLoading(true)

    const costShares = house.users.map(u => {
      const userShare = formState.costShares.find(s => s.userId === u.id)
      if (userShare) {
        return {
          userId: userShare.userId,
          amount: round(userShare.amount * 100),
        }
      } else {
        return { userId: u.id, amount: 0 }
      }
    })
    const costData = {
      ...formState,
      costShares,
      date: dayjs(formState.date).format(),
      amount: round(formState.amount * 100),
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
      <StyledButtonWrapper>
        <Button disabled={loading} loading={loading}>
          Submit
        </Button>
        {onCostDelete && (
          <Button type="button" variant="text" onClick={onCostDelete}>
            Delete
          </Button>
        )}
      </StyledButtonWrapper>
      {error && <ErrorBanner text={error} />}
    </StyledForm>
  )
}

export default CostForm

const StyledForm = styled.form`
  flex-wrap: wrap;
  padding: ${p => p.theme.paddingL};

  ${p => p.theme.flexBetween};

  ${media.greaterThan("md")`
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

const StyledButtonWrapper = styled.div`
  width: 100%;
  ${p => p.theme.flexCenter};

  ${media.greaterThan("md")`
    width: auto;
  `}
`
