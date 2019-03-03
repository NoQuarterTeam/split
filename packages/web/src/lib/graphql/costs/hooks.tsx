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

export function useAllCostsQuery(houseId: string, search: string) {
  const { data, error, loading, fetchMore } = useQuery<
    AllCosts.Query,
    AllCosts.Variables
  >(GET_ALL_COSTS, {
    variables: {
      houseId,
      search,
      skip: 0,
    },
  })
  const costs = (!loading && data && data.allCosts && data.allCosts.costs) || []
  const costsCount =
    (!loading && data && data.allCosts && data.allCosts.count) || 0

  const nextPage = (skip: number) =>
    fetchMore({
      variables: { houseId, skip, search },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !prev.allCosts || !fetchMoreResult.allCosts)
          return prev
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
    fetchMore: nextPage,
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

export function useEditCostMutation(houseId: string) {
  return useMutation<EditCost.Mutation, EditCost.Variables>(EDIT_COST, {
    refetchQueries: [
      { query: GET_HOUSE },
      {
        query: GET_ALL_COSTS,
        variables: { houseId, skip: 0, search: "" },
      },
    ],
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
          variables: { houseId: cost.houseId, skip: 0, search: "" },
        })
        if (
          data &&
          costsData &&
          costsData.allCosts &&
          costsData.allCosts.costs
        ) {
          const costs = costsData.allCosts.costs.filter(c => c.id !== cost.id)
          cache.writeQuery({
            query: GET_ALL_COSTS,
            data: {
              allCosts: {
                __typename: costsData.allCosts.__typename,
                count: costsData.allCosts.count,
                costs,
              },
            },
            variables: { houseId: cost.houseId, skip: 0, search: "" },
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
        variables: { houseId, skip: 0, search: "" },
      })
      if (data && costsData && costsData.allCosts) {
        cache.writeQuery({
          query: GET_ALL_COSTS,
          variables: { houseId, skip: 0, search: "" },
          data: {
            allCosts: {
              __typename: costsData.allCosts.__typename,
              count: costsData.allCosts.count,
              costs: [data.createCost, ...costsData.allCosts.costs],
            },
          },
        })
      }
    },
  })
}
