import React, { useState, useRef } from "react"
import { GraphQLError } from "graphql"
import AsyncStorage from "@react-native-community/async-storage"
import {
  useLogin,
  GetHouseQuery,
  GetHouseQueryVariables,
  GetHouseDocument,
  MeDocument,
} from "@split/connector"

import styled from "../../application/theme"
import useAppContext from "../../lib/hooks/useAppContext"
import Input from "../../components/Input"
import Button from "../../components/Button"
import Spacer from "../../components/styled/Spacer"
import { KeyboardAvoidingView, TextInput } from "react-native"
import Logo from "../../components/Logo"

function Login() {
  const { client } = useAppContext()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const passwordRef = useRef<TextInput>(null)

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
          >({
            query: GetHouseDocument,
            fetchPolicy: "network-only",
          })
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
    <KeyboardAvoidingView behavior="padding">
      <StyledAuthForm>
        <Logo />
        <Spacer />
        <Input
          label="Email"
          keyboardType="email-address"
          enablesReturnKeyAutomatically={true}
          blurOnSubmit={false}
          autoCapitalize="none"
          placeholder="jimsebe@gmail.com"
          returnKeyLabel="next"
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordRef.current && passwordRef.current.focus()
          }
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <Spacer />
        <Input
          ref={passwordRef}
          label="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder="********"
          returnKeyLabel="done"
          returnKeyType="done"
          onChangeText={text => setPassword(text)}
          onSubmitEditing={handleSubmit}
          value={password}
        />
        <Spacer />
        <Button
          loading={loading}
          text="Login"
          variant="primary"
          color="pink"
          onPress={handleSubmit}
          disabled={loading}
        />
        {error ? (
          <StyledError>
            <StyledErrorMessage>{error}</StyledErrorMessage>
          </StyledError>
        ) : null}
      </StyledAuthForm>
    </KeyboardAvoidingView>
  )
}

export default Login

const StyledAuthForm = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 ${p => p.theme.paddingXL};
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
