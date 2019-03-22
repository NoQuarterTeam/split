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
    update: (cache, { data }) => {
      const getMe = cache.readQuery<Me.Query, Me.Variables>({
        query: Me.Document,
      })
      if (data && data.createHouse && getMe) {
        const house = data.createHouse
        cache.writeQuery({
          query: GetHouse.Document,
          data: { house },
        })
        cache.writeQuery({
          query: Me.Document,
          data: { me: { ...getMe.me, houseId: data.createHouse.id } },
        })
      }
    },
  })
}

export function useEditHouse() {
  return EditHouse.use({
    update: (cache, { data }) => {
      const getHouse = cache.readQuery<GetHouse.Query, GetHouse.Variables>({
        query: GetHouse.Document,
      })
      if (data && data.editHouse && getHouse) {
        const res = data.editHouse
        cache.writeQuery({
          query: GetHouse.Document,
          data: { house: { ...getHouse.house, name: res.name } },
        })
      }
    },
  })
}
