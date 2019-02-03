import React, { memo, useState, useContext, useEffect } from "react"
import { RouteComponentProps, Link, navigate } from "@reach/router"
import dayjs from "dayjs"
import { useMutation, useQuery } from "react-apollo-hooks"

import { AppContext } from "../../application/context"
import { CreateCost, GetHouse, CostInput } from "../../graphql/types"
import { CREATE_COST } from "../../graphql/costs/queries"
import { ME } from "../../graphql/user/queries"

import Button from "../../components/Button"
import { GET_HOUSE } from "../../graphql/house/queries"
import useFormState from "../../hooks/useFormState"
import { round, sleep } from "../../lib/helpers"

function NewCost(_: RouteComponentProps) {
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

  const handleCostShareUpdate = (userId: string, amount: number) => {
    setEqualSplit(false)
    const { costShares } = formState
    setFormState({
      costShares: costShares.map(s => {
        if (s.userId !== userId) return s
        return {
          userId,
          amount,
        }
      }),
    })
  }

  const toggleParticipant = (userId: string) => {
    const { costShares } = formState
    const userExits = costShares.find(s => s.userId === userId)
    if (userExits) {
      if (costShares.length === 2) return
      const newCostShares = costShares.filter(s => s.userId !== userId)
      setFormState({
        costShares: newCostShares,
      })
    } else {
      const newCostShare = {
        userId,
        amount: 0,
      }
      const newShares = [...costShares, newCostShare]
      setFormState({
        costShares: newShares,
      })
    }
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

  console.log(formState)

  return (
    <div>
      <Link to="/">X</Link>
      <h2>New cost</h2>
      <form onSubmit={handleCreateHouseSubmit}>
        <input
          type="text"
          value={formState.name}
          onChange={e => setFormState({ name: e.target.value })}
        />
        <input
          type="number"
          value={formState.amount}
          onChange={e => setFormState({ amount: +e.target.value })}
        />
        <input
          type="text"
          value={formState.category}
          onChange={e => setFormState({ category: e.target.value })}
        />
        <input
          type="date"
          value={formState.date}
          onChange={e =>
            setFormState({ date: dayjs(e.target.value).format("YYYY-MM-DD") })
          }
        />
        <select
          value={formState.recurring || "default"}
          onChange={e => setFormState({ recurring: e.target.value })}
        >
          <option value="default" disabled={true}>
            No
          </option>
          <option value="monthly">Montly</option>
          <option value="weekly">Weekly</option>
        </select>

        {data!.house.users.map(user => {
          const share = formState.costShares.find(s => s.userId === user.id)
          return (
            <div
              key={user.id}
              style={{
                opacity: share ? 1 : 0.4,
              }}
            >
              <div onClick={() => toggleParticipant(user.id)}>
                {user.firstName}
              </div>
              <input
                type="number"
                disabled={!!!share}
                onChange={e => handleCostShareUpdate(user.id, +e.target.value)}
                value={share ? share.amount : 0}
              />
              <input
                type="radio"
                id={user.id}
                disabled={!!!share}
                value={user.id}
                checked={user.id === formState.payerId}
                name="payerId"
                onChange={e => setFormState({ payerId: e.target.value })}
              />
              <label htmlFor={user.id}>{user.firstName}</label>
            </div>
          )
        })}

        {!equalSplit &&
          formState.amount !==
            formState.costShares.reduce((acc, s) => acc + s.amount, 0) && (
            <p>splits dont equal amount</p>
          )}

        {!equalSplit && (
          <Button onClick={applyEqualSplit}>set equal split</Button>
        )}

        <Button loading={loading}>submit</Button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default memo(NewCost)
