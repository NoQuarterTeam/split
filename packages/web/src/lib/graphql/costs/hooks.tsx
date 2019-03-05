import { useApolloClient } from "react-apollo-hooks"

import {
  useAllCosts,
  AllCostsQuery,
  AllCostsVariables,
  AllCostsDocument,
  useGetCost,
  useEditCost,
  GetHouseDocument,
  useDestroyCost,
  GetCostGetCost,
  useCreateCost,
} from "../types"

export function useAllCostsQuery(houseId: string, search: string) {
  const client = useApolloClient()
  const { data, error, loading } = useAllCosts({
    variables: {
      houseId,
      search,
      skip: 0,
    },
  })
  const costs = (!loading && data && data.allCosts && data.allCosts.costs) || []
  const costsCount =
    (!loading && data && data.allCosts && data.allCosts.count) || 0

  const handleRefetch = async (skip: number, currentSearch: string) => {
    const { data: curentData } = await client.query<
      AllCostsQuery,
      AllCostsVariables
    >({
      query: AllCostsDocument,
      variables: { skip, search: currentSearch, houseId },
    })
    if (!curentData || !curentData.allCosts) return
    const prev = client.readQuery<AllCostsQuery, AllCostsVariables>({
      query: AllCostsDocument,
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
      query: AllCostsDocument,
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
  const { data, error } = useGetCost({
    variables: { costId },
    suspend: true,
  })
  const cost = data!.getCost
  return { cost, getCostError: error }
}

export function useEditCostMutation(houseId: string) {
  return useEditCost({
    refetchQueries: [
      { query: GetHouseDocument },
      {
        query: AllCostsDocument,
        variables: { houseId, skip: 0, search: "" },
      },
    ],
    awaitRefetchQueries: true,
  })
}

export function useDestroyCostMutation(cost: GetCostGetCost) {
  return useDestroyCost({
    variables: { costId: cost.id },
    refetchQueries: [{ query: GetHouseDocument }],
    update: (cache, { data }) => {
      const costsData = cache.readQuery<AllCostsQuery, AllCostsVariables>({
        query: AllCostsDocument,
        variables: { houseId: cost.houseId, skip: 0, search: "" },
      })
      if (data && costsData && costsData.allCosts && costsData.allCosts.costs) {
        const costs = costsData.allCosts.costs.filter(c => c.id !== cost.id)
        cache.writeQuery({
          query: AllCostsDocument,
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
  })
}

export function useCreateCostMutation(houseId: string) {
  return useCreateCost({
    refetchQueries: [{ query: GetHouseDocument }],
    awaitRefetchQueries: true,
    update: (cache, { data }) => {
      const costsData = cache.readQuery<AllCostsQuery, AllCostsVariables>({
        query: AllCostsDocument,
        variables: { houseId, skip: 0, search: "" },
      })
      if (data && costsData && costsData.allCosts) {
        cache.writeQuery({
          query: AllCostsDocument,
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
