import {
  useAllCostsQuery,
  useGetCostQuery,
  useEditCostMutation,
  useDestroyCostMutation,
  AllCostsQuery,
  AllCostsQueryVariables,
  AllCostsDocument,
  GetGroupDocument,
  useCreateCostMutation,
  CostFragment,
  QueryAllCostsArgs,
} from "../types"

export function useAllCosts(groupId: string, search: string) {
  const { data, error, loading, fetchMore } = useAllCostsQuery({
    variables: {
      groupId,
      search,
      skip: 0,
    },
  })
  const costs = (!loading && data && data.allCosts && data.allCosts.costs) || []
  const costsCount =
    (!loading && data && data.allCosts && data.allCosts.count) || 0

  const handleFetchMore = (variables: QueryAllCostsArgs) => {
    fetchMore({
      variables,
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !prev.allCosts || !fetchMoreResult.allCosts)
          return prev
        return Object.assign({}, prev, {
          allCosts: {
            ...prev.allCosts,
            costs: [...prev.allCosts.costs, ...fetchMoreResult.allCosts.costs],
          },
        })
      },
    })
  }
  return {
    costs,
    costsCount,
    fetchMore: handleFetchMore,
    costsLoading: loading,
    allCostsError: error,
  }
}

export function useGetCost(costId: string) {
  const { data, error } = useGetCostQuery({
    variables: { costId },
  })
  const cost = data && data.getCost
  return { cost, getCostError: error }
}

export function useEditCost(groupId?: string | null) {
  return useEditCostMutation({
    refetchQueries: [
      { query: GetGroupDocument },
      {
        query: AllCostsDocument,
        variables: { groupId, skip: 0, search: "" },
      },
    ],
    awaitRefetchQueries: true,
  })
}

export function useDestroyCost(cost?: CostFragment | null) {
  const costId = cost && cost.id
  return useDestroyCostMutation({
    variables: { costId: costId || "" },
    refetchQueries: [{ query: GetGroupDocument }],
    update: (cache, { data }) => {
      const costsData = cache.readQuery<AllCostsQuery, AllCostsQueryVariables>({
        query: AllCostsDocument,
        variables: { groupId: cost ? cost.groupId : "", skip: 0, search: "" },
      })
      if (data && costsData && costsData.allCosts && costsData.allCosts.costs) {
        const costs = costsData.allCosts.costs.filter(c => c.id !== costId)
        cache.writeQuery({
          query: AllCostsDocument,
          data: {
            allCosts: {
              __typename: costsData.allCosts.__typename,
              count: costsData.allCosts.count,
              costs,
            },
          },
          variables: { groupId: cost ? cost.groupId : "", skip: 0, search: "" },
        })
      }
    },
  })
}

export function useCreateCost(groupId: string) {
  return useCreateCostMutation({
    refetchQueries: [{ query: GetGroupDocument }],
    awaitRefetchQueries: true,
    update: (cache, { data }) => {
      const costsData = cache.readQuery<AllCostsQuery, AllCostsQueryVariables>({
        query: AllCostsDocument,
        variables: { groupId, skip: 0, search: "" },
      })
      if (data && costsData && costsData.allCosts) {
        cache.writeQuery({
          query: AllCostsDocument,
          variables: { groupId, skip: 0, search: "" },
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
