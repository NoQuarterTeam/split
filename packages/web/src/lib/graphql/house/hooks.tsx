import { GetHouse, CheckHouse, CreateHouse, EditHouse, Me } from "../types"

export function useGetHouse() {
  const { data, error, loading } = GetHouse.use()
  const house = data!.house!
  return { house, getHouseLoading: loading, getHouseError: error }
}

export function useCheckHouse(houseId: string | null) {
  const { data, error } = CheckHouse.use({
    variables: { houseId },
    suspend: true,
  })
  const house = data && data.checkHouse
  return { house, checkHouseError: error }
}

export function useCreateHouse() {
  return CreateHouse.use({
    refetchQueries: [{ query: Me.Document }],
    awaitRefetchQueries: true,
    update: (cache, { data }) => {
      if (data) {
        cache.writeQuery({
          query: GetHouse.Document,
          data: { house: data.createHouse },
        })
      }
    },
  })
}

export function useEditHouse() {
  return EditHouse.use({
    update: (cache, { data }) => {
      if (data) {
        const res = data.editHouse
        cache.writeQuery({ query: GetHouse.Document, data: { house: res } })
      }
    },
  })
}
