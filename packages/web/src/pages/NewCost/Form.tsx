import React, { memo, useState, useContext, useEffect } from "react"
import { navigate } from "@reach/router"
import dayjs from "dayjs"
import { useMutation, useQuery } from "react-apollo-hooks"

import { AppContext } from "../../application/context"
import { CreateCost, GetHouse, CostInput } from "../../graphql/types"
import { CREATE_COST } from "../../graphql/costs/queries"

import Button from "../../components/Button"
import { GET_HOUSE } from "../../graphql/house/queries"
import useFormState from "../../hooks/useFormState"
import Inputs from "./Inputs"
import Participants from "./Participants"
import styled from "../../application/theme"

function Form() {
  const context = useContext(AppContext)
  const { data } = useQuery<GetHouse.Query>(GET_HOUSE)
  const { formState, setFormState } = useFormState<CostInput>({
    name: "",
    amount: 0,
    category: "food",
    date: dayjs().format("YYYY-MM-DD"),
    recurring: null,
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
    const amountPerUser = formState.amount / formState.costShares.length
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
          data: formState,
        },
      })
      navigate("/")
    } catch (err) {
      setLoading(false)
      setError("error creating house")
    }
  }

  return (
    <StyledForm onSubmit={handleCreateHouseSubmit}>
      <div style={{ display: "flex" }}>
        <Inputs formState={formState} setFormState={setFormState} />
        <Participants
          users={data!.house.users}
          equalSplit={equalSplit}
          formState={formState}
          setFormState={setFormState}
          setEqualSplit={setEqualSplit}
          applyEqualSplit={applyEqualSplit}
        />
      </div>

      <Button loading={loading}>submit</Button>
      {error && <p>{error}</p>}
    </StyledForm>
  )
}

export default memo(Form)

const StyledForm = styled.form`
  padding: ${p => p.theme.paddingXL};
`
