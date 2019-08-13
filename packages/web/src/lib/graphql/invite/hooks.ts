import {
  useCreateInviteMutation,
  GetHouseDocument,
  GetHouseQueryVariables,
  GetHouseQuery,
  useCheckInviteQuery,
  useDestroyInviteMutation,
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

export function useDestroyInvite(inviteId: string) {
  return useDestroyInviteMutation({
    update: (cache, { data }) => {
      const res = cache.readQuery<GetHouseQuery, GetHouseQueryVariables>({
        query: GetHouseDocument,
      })
      if (data && res && res.house && data.destroyInvite) {
        const invites = res.house.invites.filter(i => i.id !== inviteId)
        cache.writeQuery({
          query: GetHouseDocument,
          data: {
            ...res,
            house: {
              ...res.house,
              invites,
            },
          },
        })
      }
    },
  })
}

export function useCheckInvite(inviteId: string | null) {
  if (!inviteId) return { house: null, checkInviteError: null }
  const { data, error } = useCheckInviteQuery({
    variables: { inviteId },
  })
  const house = data && data.checkInvite
  return { house, checkInviteError: error }
}
