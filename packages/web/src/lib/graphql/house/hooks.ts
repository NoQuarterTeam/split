import {
  useGetHouseQuery,
  useCreateHouseMutation,
  MeQuery,
  useEditHouseMutation,
  MeDocument,
  GetHouseDocument,
  MeQueryVariables,
} from "../types"

export function useGetHouse() {
  const { data, error, loading } = useGetHouseQuery()
  const house = (data && data.house) || null
  return { house, getHouseLoading: loading, getHouseError: error }
}

export function useCreateHouse() {
  return useCreateHouseMutation({
    update: (cache, { data }) => {
      const getMe = cache.readQuery<MeQuery, MeQueryVariables>({
        query: MeDocument,
      })
      if (data && data.createHouse && getMe) {
        const house = data.createHouse
        cache.writeQuery({
          query: GetHouseDocument,
          data: { house },
        })
        cache.writeQuery({
          query: MeDocument,
          data: { me: { ...getMe.me, houseId: data.createHouse.id } },
        })
      }
    },
  })
}

export function useEditHouse() {
  return useEditHouseMutation()
}
