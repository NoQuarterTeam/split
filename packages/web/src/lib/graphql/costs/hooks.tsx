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
  const { data, error, loading, fetchMore } = useQuery<
    AllCosts.Query,
    AllCosts.Variables
  >(GET_ALL_COSTS, {
    variables: {
      houseId,
      skip: 0,
    },
  })
  const costs = (data && data.allCosts) || []
  const nextPage = (skip: number) =>
    fetchMore({
      variables: { houseId, skip },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return Object.assign({}, prev, {
          allCosts: [...prev.allCosts, ...fetchMoreResult.allCosts],
        })
      },
    })

  return { costs, next: nextPage, costsLoading: loading, allCostsError: error }
}

export function useGetCostQuery(costId: string) {
  const { data, error } = useQuery<GetCost.Query, GetCost.Variables>(GET_COST, {
    variables: { costId },
    suspend: true,
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
    // refetchQueries: [{ query: GET_HOUSE }],
    // awaitRefetchQueries: true,
    update: (cache, { data }) => {
      const costs = cache.readQuery<AllCosts.Query, AllCosts.Variables>({
        query: GET_ALL_COSTS,
      })
      if (data && costs) {
        console.log(costs)
        console.log(data.createCost)

        // costs.allCosts.unshift(data.createCost)
        cache.writeQuery({ query: GET_ALL_COSTS, data: { allCosts: costs } })
      }
    },
  })
}
