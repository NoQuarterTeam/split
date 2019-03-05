import { useApolloClient } from "react-apollo-hooks"

import {
  AllCosts,
  GetCost,
  EditCost,
  GetHouse,
  DestroyCost,
  CreateCost,
} from "../types"

export function useAllCosts(houseId: string, search: string) {
  const client = useApolloClient()
  const { data, error, loading } = AllCosts.use({
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
      AllCosts.Query,
      AllCosts.Variables
    >({
      query: AllCosts.Document,
      variables: { skip, search: currentSearch, houseId },
    })
    if (!curentData || !curentData.allCosts) return
    const prev = client.readQuery<AllCosts.Query, AllCosts.Variables>({
      query: AllCosts.Document,
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
      query: AllCosts.Document,
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

export function useGetCost(costId: string) {
  const { data, error } = GetCost.use({
    variables: { costId },
    suspend: true,
  })
  const cost = data!.getCost
  return { cost, getCostError: error }
}

export function useEditCost(houseId: string) {
  return EditCost.use({
    refetchQueries: [
      { query: GetHouse.Document },
      {
        query: AllCosts.Document,
        variables: { houseId, skip: 0, search: "" },
      },
    ],
    awaitRefetchQueries: true,
  })
}

export function useDestroyCost(cost: GetCost.GetCost) {
  return DestroyCost.use({
    variables: { costId: cost.id },
    refetchQueries: [{ query: GetHouse.Document }],
    update: (cache, { data }) => {
      const costsData = cache.readQuery<AllCosts.Query, AllCosts.Variables>({
        query: AllCosts.Document,
        variables: { houseId: cost.houseId, skip: 0, search: "" },
      })
      if (data && costsData && costsData.allCosts && costsData.allCosts.costs) {
        const costs = costsData.allCosts.costs.filter(c => c.id !== cost.id)
        cache.writeQuery({
          query: AllCosts.Document,
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

export function useCreateCost(houseId: string) {
  return CreateCost.use({
    refetchQueries: [{ query: GetHouse.Document }],
    awaitRefetchQueries: true,
    update: (cache, { data }) => {
      const costsData = cache.readQuery<AllCosts.Query, AllCosts.Variables>({
        query: AllCosts.Document,
        variables: { houseId, skip: 0, search: "" },
      })
      if (data && costsData && costsData.allCosts) {
        cache.writeQuery({
          query: AllCosts.Document,
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
