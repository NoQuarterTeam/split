import { useApolloClient } from "react-apollo-hooks"
import {
  Login,
  UpdateUser,
  Register,
  InviteUser,
  ForgotPassword,
  ResetPassword,
  Me,
  GetHouse,
  Logout,
} from "../types"

export function useMe() {
  const { data, loading } = Me.use({ suspend: false })
  const user = (data && data.me) || null
  return { user, userLoading: loading }
}

export function useLogin() {
  return Login.use({
    refetchQueries: [{ query: GetHouse.Document }],
    awaitRefetchQueries: true,
    update: (cache, res) => {
      if (res.data) {
        localStorage.setItem("token", res.data.login.token)
        cache.writeQuery({
          query: Me.Document,
          data: { me: res.data.login.user },
        })
      }
    },
  })
}

export function useUpdateUser() {
  return UpdateUser.use({
    update: (cache, res) => {
      if (res.data && res.data.updateUser) {
        cache.writeQuery({
          query: Me.Document,
          data: { me: res.data.updateUser },
        })
      }
    },
  })
}

export function useRegister() {
  return Register.use({
    refetchQueries: [{ query: GetHouse.Document }],
    awaitRefetchQueries: true,
    update: (cache, res) => {
      if (res.data) {
        localStorage.setItem("token", res.data.register.token)
        cache.writeQuery({
          query: Me.Document,
          data: { me: res.data.register.user },
        })
      }
    },
  })
}

export function useLogout() {
  const client = useApolloClient()
  const logout = Logout.use()

  const handleLogout = async () => {
    localStorage.removeItem("token")
    await logout({
      update: cache =>
        cache.writeQuery({ query: Me.Document, data: { me: null } }),
    })
    await client.resetStore()
  }

  return handleLogout
}

export function useInviteUser() {
  return InviteUser.use()
}

export function useForgotPassword() {
  return ForgotPassword.use()
}

export function useResetPassword() {
  return ResetPassword.use()
}
