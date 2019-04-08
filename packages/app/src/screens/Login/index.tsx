import React, { useState } from "react"
import { Button } from "react-native"
import { GraphQLError } from "graphql"
import {
  useLogin,
  GetHouseQuery,
  GetHouseQueryVariables,
  GetHouseDocument,
  MeDocument,
} from "@split/connector"

import styled from "../../application/theme"
import useAppContext from "../../lib/hooks/useAppContext"
import AsyncStorage from "@react-native-community/async-storage"

function Login() {
  const { client } = useAppContext()
  const [email, setEmail] = useState<string>("jack@noquarter.co")
  const [password, setPassword] = useState<string>("password")
  const login = useLogin()
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = () => {
    setLoading(true)
    login({
      variables: { data: { email, password } },
      update: async (cache, { data }) => {
        if (data) {
          await AsyncStorage.setItem("token", data.login.token)
          const houseRes = await client.query<
            GetHouseQuery,
            GetHouseQueryVariables
          >({ query: GetHouseDocument, fetchPolicy: "network-only" })
          if (houseRes.data) {
            cache.writeQuery({
              query: MeDocument,
              data: { me: data.login.user },
            })
            cache.writeQuery({
              query: GetHouseDocument,
              data: { house: houseRes.data.house },
            })
          }
        }
      },
    }).catch((loginError: GraphQLError) => {
      setLoading(false)
      setError(loginError.message.split(":")[1])
    })
  }

  return (
    <StyledAuthForm>
      <StyledInput onChangeText={text => setEmail(text)} value={email} />
      <StyledInput onChangeText={text => setPassword(text)} value={password} />
      <Button title="Login" onPress={handleSubmit} disabled={loading} />
      {error ? (
        <StyledError>
          <StyledErrorMessage>{error}</StyledErrorMessage>
        </StyledError>
      ) : null}
    </StyledAuthForm>
  )
}

export default Login

const StyledAuthForm = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`
const StyledInput = styled.TextInput`
  border: 2px solid black;
  width: 100px;
`

const StyledError = styled.View`
  opacity: 0.4;
  width: 100%;
  padding: ${p => p.theme.paddingM};
`

const StyledErrorMessage = styled.Text`
  font-size: ${p => p.theme.textS};
  text-align: right;
  color: ${p => p.theme.colorText};
`
