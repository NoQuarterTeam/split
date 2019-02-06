import React, { memo, useState } from "react"
import { useMutation } from "react-apollo-hooks"
import styled from "../application/theme"

import { LOGIN, ME } from "../graphql/user/queries"
import { Login } from "../graphql/types"
import Button from "./Button"
import Input from "./Input"

function LoginForm() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const login = useMutation<Login.Mutation, Login.Variables>(LOGIN, {
    update: (cache, res) => {
      if (res.data) {
        const me = res.data.login
        cache.writeQuery({ query: ME, data: { me } })
      }
    },
    variables: { data: { email, password } },
  })

  const handleLogin = (e: any) => {
    e.preventDefault()
    setLoading(true)
    login().catch(loginError => {
      setLoading(false)
      setError(loginError.message.split(":")[1])
    })
  }

  return (
    <StyledForm onSubmit={handleLogin}>
      <StyledHeader>Split</StyledHeader>
      <Input
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
        required={true}
        placeholder="jim@gmail.com"
      />
      <br />
      <Input
        label="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        required={true}
        placeholder="********"
      />
      <br />
      <Button loading={loading} full={true}>
        Login
      </Button>
      {error && <StyledError>{error}</StyledError>}
    </StyledForm>
  )
}

const StyledForm = styled.form`
  max-width: 500px;
  width: 40%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  border-radius: ${p => p.theme.borderRadius};
  padding: ${p => p.theme.paddingM};
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`

const StyledHeader = styled.h1`
  margin-bottom: ${p => p.theme.paddingXL};
`
const StyledError = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  opacity: 0.4;
  width: 100%;
  text-align: right;
  padding: ${p => p.theme.paddingM};
  font-size: ${p => p.theme.textS};
`

export default memo(LoginForm)
