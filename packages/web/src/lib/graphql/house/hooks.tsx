import {
  useCreateHouse,
  useCheckHouse,
  useGetHouse,
  GetHouseDocument,
  useEditHouse,
  MeDocument,
} from "../types"

export function useGetHouseQuery() {
  const { data, error, loading } = useGetHouse()
  const house = data!.house!
  return { house, getHouseLoading: loading, getHouseError: error }
}

export function useCheckHouseQuery(houseId: string | null) {
  const { data, error } = useCheckHouse({
    variables: { houseId },
    suspend: true,
  })
  const house = data && data.checkHouse
  return { house, checkHouseError: error }
}

export function useCreateHouseMutation() {
  return useCreateHouse({
    refetchQueries: [{ query: MeDocument }],
    awaitRefetchQueries: true,
    update: (cache, { data }) => {
      if (data) {
        cache.writeQuery({
          query: GetHouseDocument,
          data: { house: data.createHouse },
        })
      }
    },
  })
}

export function useEditHouseMutation() {
  return useEditHouse({
    update: (cache, { data }) => {
      if (data) {
        const res = data.editHouse
        cache.writeQuery({ query: GetHouseDocument, data: { house: res } })
      }
    },
  })
}
