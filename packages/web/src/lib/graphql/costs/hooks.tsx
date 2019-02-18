import { useQuery, useMutation } from "react-apollo-hooks"

import { AllCosts, GetCost, EditCost, DestroyCost, CreateCost } from "../types"
import {
  GET_ALL_COSTS,
  GET_COST,
  EDIT_COST,
  DESTROY_COST,
  CREATE_COST,
} from "./queries"
import { GET_HOUSE } from "../house/queries"

export function useAllCostsQuery(houseId: string) {
  const { data, error } = useQuery<AllCosts.Query, AllCosts.Variables>(
    GET_ALL_COSTS,
    {
      variables: { houseId },
    },
  )
  const costs = data!.allCosts
  return { costs, allCostsError: error }
}

export function useGetCostQuery(costId: string) {
  const { data, error } = useQuery<GetCost.Query, GetCost.Variables>(GET_COST, {
    variables: { costId },
  })
  const cost = data!.getCost
  return { cost, getCostError: error }
}

export function useEditCostMutation(houseId: string) {
  return useMutation<EditCost.Mutation, EditCost.Variables>(EDIT_COST, {
    refetchQueries: [
      { query: GET_HOUSE },
      { query: GET_ALL_COSTS, variables: { houseId } },
    ],
    awaitRefetchQueries: true,
  })
}

export function useDestroyCostMutation(houseId: string) {
  return useMutation<DestroyCost.Mutation, DestroyCost.Variables>(
    DESTROY_COST,
    {
      refetchQueries: [
        { query: GET_HOUSE },
        { query: GET_ALL_COSTS, variables: { houseId } },
      ],
      awaitRefetchQueries: true,
    },
  )
}

export function useCreateCostMutation(houseId: string) {
  return useMutation<CreateCost.Mutation, CreateCost.Variables>(CREATE_COST, {
    refetchQueries: [
      { query: GET_HOUSE },
      { query: GET_ALL_COSTS, variables: { houseId } },
    ],
    awaitRefetchQueries: true,
  })
}
