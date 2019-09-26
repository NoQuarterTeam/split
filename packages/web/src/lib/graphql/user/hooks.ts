import { useApolloClient } from "@apollo/react-hooks"

import {
  useLoginMutation,
  useMeQuery,
  useUpdateUserMutation,
  useRegisterMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  MeDocument,
  GetGroupQuery,
  GetGroupQueryVariables,
  GetGroupDocument,
} from "../types"

export function useMe() {
  const { data, loading } = useMeQuery()
  const user = (data && data.me) || null
  return { user, userLoading: loading }
}

export function useLogin() {
  const client = useApolloClient()
  return useLoginMutation({
    update: async (cache, { data }) => {
      if (data) {
        const groupRes = await client.query<
          GetGroupQuery,
          GetGroupQueryVariables
        >({ query: GetGroupDocument, fetchPolicy: "network-only" })
        if (groupRes.data) {
          cache.writeQuery({
            query: MeDocument,
            data: { me: data.login },
          })
          cache.writeQuery({
            query: GetGroupDocument,
            data: { group: groupRes.data.group },
          })
        }
      }
    },
  })
}

export function useUpdateUser() {
  return useUpdateUserMutation()
}

export function useRegister() {
  const client = useApolloClient()
  return useRegisterMutation({
    update: async (cache, { data }) => {
      if (data) {
        const groupRes = await client.query<
          GetGroupQuery,
          GetGroupQueryVariables
        >({ query: GetGroupDocument, fetchPolicy: "network-only" })
        if (groupRes.data) {
          cache.writeQuery({
            query: MeDocument,
            data: { me: data.register },
          })
          cache.writeQuery({
            query: GetGroupDocument,
            data: { group: groupRes.data.group },
          })
        }
      }
    },
  })
}

export function useLogout() {
  const client = useApolloClient()
  return useLogoutMutation({
    update: async cache => {
      cache.writeQuery({ query: MeDocument, data: { me: null } })
      await client.resetStore()
    },
  })
}

export function useForgotPassword() {
  return useForgotPasswordMutation()
}

export function useResetPassword() {
  return useResetPasswordMutation()
}
