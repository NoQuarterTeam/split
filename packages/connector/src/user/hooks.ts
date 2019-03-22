import { useApolloClient } from "react-apollo-hooks"
import {
  useLoginMutation,
  useMeQuery,
  useUpdateUserMutation,
  useRegisterMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  GetHouseDocument,
  MeDocument,
} from "../types"

export function useMe() {
  const { data, loading } = useMeQuery({ suspend: false })
  const user = (data && data.me) || null
  return { user, userLoading: loading }
}

export function useLogin() {
  return useLoginMutation({
    refetchQueries: [{ query: GetHouseDocument }],
    awaitRefetchQueries: true,
    update: (cache, res) => {
      if (res.data) {
        localStorage.setItem("token", res.data.login.token)
        cache.writeQuery({
          query: MeDocument,
          data: { me: res.data.login.user },
        })
      }
    },
  })
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
  return useRegisterMutation({
    refetchQueries: [{ query: GetHouseDocument }],
    awaitRefetchQueries: true,
    update: (cache, res) => {
      if (res.data) {
        localStorage.setItem("token", res.data.register.token)
        cache.writeQuery({
          query: MeDocument,
          data: { me: res.data.register.user },
        })
      }
    },
  })
}

export function useLogout() {
  const client = useApolloClient()
  const logout = useLogoutMutation()

  const handleLogout = async () => {
    localStorage.removeItem("token")
    await logout({
      update: cache =>
        cache.writeQuery({ query: MeDocument, data: { me: null } }),
    })
    await client.resetStore()
  }

  return handleLogout
}

export function useForgotPassword() {
  return useForgotPasswordMutation()
}

export function useResetPassword() {
  return useResetPasswordMutation()
}
