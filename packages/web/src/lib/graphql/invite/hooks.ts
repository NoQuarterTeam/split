import {
  useCreateInviteMutation,
  GetGroupDocument,
  GetGroupQueryVariables,
  GetGroupQuery,
  useCheckInviteQuery,
  useDestroyInviteMutation,
} from "../types"

export function useCreateInvite() {
  return useCreateInviteMutation({
    update: (cache, { data }) => {
      const res = cache.readQuery<GetGroupQuery, GetGroupQueryVariables>({
        query: GetGroupDocument,
      })
      if (data && res && res.group) {
        cache.writeQuery({
          query: GetGroupDocument,
          data: {
            ...res,
            group: {
              ...res.group,
              invites: [...res.group.invites, data.createInvite],
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
      const res = cache.readQuery<GetGroupQuery, GetGroupQueryVariables>({
        query: GetGroupDocument,
      })
      if (data && res && res.group && data.destroyInvite) {
        const invites = res.group.invites.filter(i => i.id !== inviteId)
        cache.writeQuery({
          query: GetGroupDocument,
          data: {
            ...res,
            group: {
              ...res.group,
              invites,
            },
          },
        })
      }
    },
  })
}

export function useCheckInvite(inviteId: string | null) {
  if (!inviteId) return { group: null, checkInviteError: null }
  const { data, error } = useCheckInviteQuery({
    variables: { inviteId },
  })
  const group = data && data.checkInvite
  return { group, checkInviteError: error }
}
