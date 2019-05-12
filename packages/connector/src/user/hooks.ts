import { useApolloClient } from "react-apollo-hooks"

import {
  useLoginMutation,
  useMeQuery,
  useUpdateUserMutation,
  useRegisterMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  MeDocument,
  GetHouseQuery,
  GetHouseQueryVariables,
  GetHouseDocument,
} from "../types"

export function useMe() {
  const { data, loading } = useMeQuery({ suspend: false })
  const user = (data && data.me) || null
  return { user, userLoading: loading }
}

export function useLogin() {
  const client = useApolloClient()
  return useLoginMutation({
    update: async (cache, { data }) => {
      if (data) {
        const houseRes = await client.query<
          GetHouseQuery,
          GetHouseQueryVariables
        >({ query: GetHouseDocument, fetchPolicy: "network-only" })
        if (houseRes.data) {
          cache.writeQuery({
            query: MeDocument,
            data: { me: data.login },
          })
          cache.writeQuery({
            query: GetHouseDocument,
            data: { house: houseRes.data.house },
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
        const houseRes = await client.query<
          GetHouseQuery,
          GetHouseQueryVariables
        >({ query: GetHouseDocument, fetchPolicy: "network-only" })
        if (houseRes.data) {
          cache.writeQuery({
            query: MeDocument,
            data: { me: data.register },
          })
          cache.writeQuery({
            query: GetHouseDocument,
            data: { house: houseRes.data.house },
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
