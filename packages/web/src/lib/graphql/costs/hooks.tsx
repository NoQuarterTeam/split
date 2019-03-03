import { useQuery, useMutation, useApolloClient } from "react-apollo-hooks"

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
  const client = useApolloClient()
  const { data, error, loading } = useQuery<AllCosts.Query, AllCosts.Variables>(
    GET_ALL_COSTS,
    {
      variables: {
        houseId,
        search,
        skip: 0,
      },
    },
  )
  const costs = (!loading && data && data.allCosts && data.allCosts.costs) || []
  const costsCount =
    (!loading && data && data.allCosts && data.allCosts.count) || 0

  const handleRefetch = async (skip: number, currentSearch: string) => {
    const { data: curentData } = await client.query<
      AllCosts.Query,
      AllCosts.Variables
    >({
      query: GET_ALL_COSTS,
      variables: { skip, search: currentSearch, houseId },
    })
    if (!curentData || !curentData.allCosts) return
    const prev = client.readQuery<AllCosts.Query, AllCosts.Variables>({
      query: GET_ALL_COSTS,
      variables: { skip: 0, houseId, search: currentSearch },
    })
    if (!prev || !prev.allCosts) return
    const newData = Object.assign({}, prev, {
      allCosts: {
        ...prev.allCosts,
        costs: [...prev.allCosts.costs, ...curentData.allCosts.costs],
      },
    })
    await client.writeQuery({
      query: GET_ALL_COSTS,
      variables: { skip: 0, houseId, search: currentSearch },
      data: newData,
    })
  }
  return {
    costs,
    costsCount,
    fetchMore: handleRefetch,
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
