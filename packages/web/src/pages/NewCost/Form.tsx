import React, { memo, useState, useContext, useEffect } from "react"
import { navigate } from "@reach/router"
import dayjs from "dayjs"
import { useMutation, useQuery } from "react-apollo-hooks"

import styled from "../../application/theme"
import { AppContext } from "../../application/context"
import { CreateCost, GetHouse, CostInput } from "../../graphql/types"
import { CREATE_COST } from "../../graphql/costs/queries"
import { GET_HOUSE } from "../../graphql/house/queries"

import Button from "../../components/Button"
import useFormState from "../../hooks/useFormState"
import Inputs from "./Inputs"
import Participants from "./Participants"
import { round } from "../../lib/helpers"

function Form() {
  const context = useContext(AppContext)
  const { data } = useQuery<GetHouse.Query>(GET_HOUSE)
  const { formState, setFormState } = useFormState<CostInput>({
    name: "",
    amount: 0,
    category: "",
    date: dayjs().format("YYYY-MM-DD"),
    recurring: "one-off",
    houseId: context.user!.house.id,
    payerId: context.user.id,
    costShares: data!.house.users.map(u => ({ userId: u.id, amount: 0 })),
  })
  const [equalSplit, setEqualSplit] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const createCost = useMutation<CreateCost.Mutation, CreateCost.Variables>(
    CREATE_COST,
  )

  useEffect(() => {
    if (equalSplit) {
      applyEqualSplit()
    }
    if (
      formState.costShares.filter(s => s.userId === formState.payerId)
        .length === 0
    ) {
      setFormState({ payerId: formState.costShares[0].userId })
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
    setLoading(true)
    try {
      await createCost({
        refetchQueries: [{ query: GET_HOUSE }],
        variables: {
          data: {
            ...formState,
            amount: formState.amount * 100,
            costShares: formState.costShares.map(s => ({
              userId: s.userId,
              amount: round(s.amount * 100, 2),
            })),
          },
        },
      })
      navigate("/")
    } catch (err) {
      setLoading(false)
      setError("Error creating cost")
    }
  }

  return (
    <StyledForm onSubmit={handleCreateHouseSubmit}>
      <StyleFieldsWrapper>
        <Inputs formState={formState} setFormState={setFormState} />
        <Participants
          users={data!.house.users}
          equalSplit={equalSplit}
          formState={formState}
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

export default memo(Form)

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
