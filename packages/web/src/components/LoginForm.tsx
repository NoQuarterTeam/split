import React, { memo, useState } from "react"
import { RouteComponentProps, Link } from "@reach/router"
import { useMutation } from "react-apollo-hooks"
import styled from "../application/theme"

import IconLogo from "../assets/images/icon-logo.svg"
import { LOGIN, ME } from "../lib/graphql/user/queries"
import { Login } from "../lib/graphql/types"
import Button from "./Button"
import Input from "./Input"

function LoginForm(props: RouteComponentProps) {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const login = useMutation<Login.Mutation, Login.Variables>(LOGIN, {
    variables: { data: { email, password } },
    refetchQueries: [{ query: ME }],
    awaitRefetchQueries: true,
    update: (_, res) => {
      if (res.data) {
        localStorage.setItem("token", res.data.login.token)
      }
    },
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
    login()
      .then(() => props.navigate!("/"))
      .catch(loginError => {
        setLoading(false)
        setError(loginError.message.split(":")[1])
      })
  }

  return (
    <StyledLogin>
      <StyledForm onSubmit={handleSubmit}>
        <StyledHeader>
          <img src={IconLogo} width={30} />
          Split
        </StyledHeader>
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
        <Link to="/register">
          <StyledLink>Sign up</StyledLink>
        </Link>
      </StyledForm>
    </StyledLogin>
  )
}

export default memo(LoginForm)

const StyledLogin = styled.div`
  height: 100vh;
  width: 100vw;
  ${p => p.theme.flexCenter};
`

const StyledForm = styled.form`
  height: 100%;
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  padding: ${p => p.theme.paddingM};
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`

const StyledHeader = styled.h1`
  margin-bottom: ${p => p.theme.paddingXL};
`

const StyledLink = styled.div`
  text-align: right;
  width: 100%;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  color: ${p => p.theme.colorHeader};
  padding: ${p => p.theme.paddingS};
  font-size: ${p => p.theme.textM};

  &:hover {
    opacity: 0.8;
  }
  &:focus {
    text-decoration: underline;
  }
`
const StyledError = styled.div`
  opacity: 0.4;
  width: 100%;
  text-align: right;
  padding: ${p => p.theme.paddingM};
  font-size: ${p => p.theme.textS};
`
