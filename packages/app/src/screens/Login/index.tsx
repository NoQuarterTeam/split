import React, { useState, useRef } from "react"
import { GraphQLError } from "graphql"
import { TextInput } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useLogin } from "@split/connector"

import styled from "../../application/theme"
import useAppContext from "../../lib/hooks/useAppContext"
import Input from "../../components/Input"
import Button from "../../components/Button"
import Spacer from "../../components/styled/Spacer"
import Logo from "../../components/Logo"

function Login() {
  const { setRoute } = useAppContext()
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
    })
      .then(() => {
        setRoute("BALANCE")
      })
      .catch((loginError: GraphQLError) => {
        setLoading(false)
        setError(loginError.message.split(":")[1])
      })
  }

  return (
    <KeyboardAwareScrollView>
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
          onChangeText={setEmail}
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
          onChangeText={setPassword}
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
        <Spacer />
        <Button
          full={true}
          text="Sign up"
          variant="tertiary"
          color="blue"
          onPress={() => setRoute("REGISTER")}
          disabled={loading}
        />
      </StyledAuthForm>
    </KeyboardAwareScrollView>
  )
}

export default Login

const StyledAuthForm = styled.View`
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding: ${p => p.theme.paddingXL};
  padding-top: 80px;
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
