import { useQuery, useMutation } from "react-apollo-hooks"
import { GET_HOUSE, CREATE_HOUSE, EDIT_HOUSE, CHECK_HOUSE } from "./queries"
import { GetHouse, CreateHouse, EditHouse, CheckHouse } from "../types"
import { ME } from "../user/queries"

export function useHouseQuery() {
  const { data, error } = useQuery<GetHouse.Query>(GET_HOUSE)
  const house = data!.house!
  return { house, getHouseError: error }
}

export function useCheckHouseQuery(houseId: string | null) {
  const { data, error } = useQuery<CheckHouse.Query, CheckHouse.Variables>(
    CHECK_HOUSE,
    { variables: { houseId } },
  )
  const house = data && data.checkHouse
  return { house, checkHouseError: error }
}

export function useCreateHouseMutation() {
  return useMutation<CreateHouse.Mutation, CreateHouse.Variables>(
    CREATE_HOUSE,
    {
      refetchQueries: [{ query: ME }],
      awaitRefetchQueries: true,
      update: (cache, { data }) => {
        if (data) {
          cache.writeQuery({
            query: GET_HOUSE,
            data: { house: data.createHouse },
          })
        }
      },
    },
  )
}

export function useEditHouseMutation() {
  return useMutation<EditHouse.Mutation, EditHouse.Variables>(EDIT_HOUSE, {
    update: (cache, { data }) => {
      if (data) {
        const res = data.editHouse
        cache.writeQuery({ query: GET_HOUSE, data: { house: res } })
      }
    },
  })
}
