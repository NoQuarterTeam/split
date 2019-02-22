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
  const costs = (!loading && data && data.allCosts.costs) || []
  const costsCount = (!loading && data && data.allCosts.count) || 0

  const nextPage = (skip: number) =>
    fetchMore({
      variables: { houseId, skip },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return Object.assign({}, prev, {
          ...prev.allCosts,
          allCosts: {
            __typename: prev.allCosts.__typename,
            count: prev.allCosts.count,
            costs: [...prev.allCosts.costs, ...fetchMoreResult.allCosts.costs],
          },
        })
      },
    })

  return {
    costs,
    costsCount,
    next: nextPage,
    costsLoading: loading,
    allCostsError: error,
  }
}

export function useGetCostQuery(costId: string) {
  const { data, error } = useQuery<GetCost.Query, GetCost.Variables>(GET_COST, {
    variables: { costId },
    suspend: true,
  })
  const cost = data!.getCost
  return { cost, getCostError: error }
}

export function useEditCostMutation() {
  return useMutation<EditCost.Mutation, EditCost.Variables>(EDIT_COST, {
    refetchQueries: [{ query: GET_HOUSE }],
    awaitRefetchQueries: true,
  })
}

export function useDestroyCostMutation(cost: GetCost.GetCost) {
  return useMutation<DestroyCost.Mutation, DestroyCost.Variables>(
    DESTROY_COST,
    {
      variables: { costId: cost.id },
      refetchQueries: [{ query: GET_HOUSE }],
      update: (cache, { data }) => {
        const costsData = cache.readQuery<AllCosts.Query, AllCosts.Variables>({
          query: GET_ALL_COSTS,
          variables: { houseId: cost.houseId, skip: 0 },
        })
        if (data && costsData && costsData.allCosts.costs) {
          const costs = costsData.allCosts.costs.filter(c => c.id !== cost.id)
          cache.writeQuery({
            query: GET_ALL_COSTS,
            data: { allCosts: { costs } },
            variables: { houseId: cost.houseId, skip: 0 },
          })
        }
      },
    },
  )
}

export function useCreateCostMutation(houseId: string) {
  return useMutation<CreateCost.Mutation, CreateCost.Variables>(CREATE_COST, {
    refetchQueries: [{ query: GET_HOUSE }],
    awaitRefetchQueries: true,
    update: (cache, { data }) => {
      const costsData = cache.readQuery<AllCosts.Query, AllCosts.Variables>({
        query: GET_ALL_COSTS,
        variables: { houseId, skip: 0 },
      })
      if (data && costsData && costsData.allCosts) {
        cache.writeQuery({
          query: GET_ALL_COSTS,
          variables: { houseId, skip: 0 },
          data: {
            allCosts: { costs: [data.createCost, ...costsData.allCosts.costs] },
          },
        })
      }
    },
  })
}
