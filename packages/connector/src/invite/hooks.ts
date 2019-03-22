import {
  useCreateInviteMutation,
  GetHouseDocument,
  GetHouseQueryVariables,
  GetHouseQuery,
} from "../types"

export function useCreateInvite() {
  return useCreateInviteMutation({
    update: (cache, { data }) => {
      const res = cache.readQuery<GetHouseQuery, GetHouseQueryVariables>({
        query: GetHouseDocument,
      })
      if (data && res && res.house) {
        cache.writeQuery({
          query: GetHouseDocument,
          data: {
            ...res,
            house: {
              ...res.house,
              invites: [...res.house.invites, data.createInvite],
            },
          },
        })
      }
    },
  })
}
