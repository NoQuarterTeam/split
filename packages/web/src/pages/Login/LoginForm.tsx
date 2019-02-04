import React, { memo, useState } from "react"
import { useMutation } from "react-apollo-hooks"
import styled from "../../application/theme"

import { LOGIN, ME } from "../../graphql/user/queries"
import { Login } from "../../graphql/types"
import Button from "../../components/Button"
import Input from "../../components/Input"

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
      <Input
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
        required={true}
        placeholder="Email"
      />
      <br />
      <Input
        label="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        required={true}
        placeholder="Password"
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
  margin: 0 auto;
  border-radius: ${p => p.theme.borderRadius};
  padding: ${p => p.theme.paddingM};
`

const StyledInput = styled.input`
  width: 100%;
  border: 0;
  outline: 0;

  font-weight: ${p => p.theme.fontBold};
  font-size: ${p => p.theme.textM};
  border-radius: ${p => p.theme.borderRadius};
  padding: ${p => p.theme.paddingM};
  margin-bottom: ${p => p.theme.paddingM};

  &::placeholder {
    font-weight: ${p => p.theme.fontNormal};
    font-size: ${p => p.theme.textM};
  }
`
const StyledError = styled.div`
  opacity: 0.3;
  text-transform: uppercase;
  padding: ${p => p.theme.paddingM};
  font-size: ${p => p.theme.textS};
  font-weight: ${p => p.theme.fontBlack};
`

export default memo(LoginForm)
