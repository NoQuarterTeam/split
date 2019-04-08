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
} from "../types"

export function useMe() {
  const { data, loading } = useMeQuery({ suspend: false })
  const user = (data && data.me) || null
  return { user, userLoading: loading }
}

export function useLogin() {
  return useLoginMutation()
}

export function useUpdateUser() {
  return useUpdateUserMutation({
    update: (cache, res) => {
      if (res.data && res.data.updateUser) {
        cache.writeQuery({
          query: MeDocument,
          data: { me: res.data.updateUser },
        })
      }
    },
  })
}

export function useRegister() {
  return useRegisterMutation()
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
