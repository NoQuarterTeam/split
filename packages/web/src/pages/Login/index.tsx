import React, { memo, useState } from "react"
import { RouteComponentProps, Link } from "@reach/router"
import styled from "../../application/theme"

import IconLogo from "../../assets/images/icon-logo.svg"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { useLogin } from "../../lib/graphql/user/hooks"
import { GraphQLError } from "graphql"
import Center from "../../components/styled/Center"

function Login(props: RouteComponentProps) {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const login = useLogin()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
    login({
      variables: { data: { email, password } },
    })
      .then(() => props.navigate!("/"))
      .catch((loginError: GraphQLError) => {
        setLoading(false)
        setError(loginError.message.split(":")[1])
      })
  }

  return (
    <Center style={{ height: "100vh" }}>
      <StyledForm onSubmit={handleSubmit}>
        <StyledHeader>
          <img src={IconLogo} width={30} alt="logo" />
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
        <StyledLinks>
          <Link to="/forgot-password">
            <StyledLink>Forgot password?</StyledLink>
          </Link>
          <Link to="/register">
            <StyledLink>Sign up</StyledLink>
          </Link>
        </StyledLinks>
      </StyledForm>
    </Center>
  )
}

export default memo(Login)

const StyledForm = styled.form`
  height: 100%;
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: ${p => p.theme.paddingL};
`

const StyledHeader = styled.h1`
  margin-bottom: ${p => p.theme.paddingXL};
`

const StyledLinks = styled.div`
  width: 100%;
  padding: ${p => p.theme.paddingL} 0;
  ${p => p.theme.flexBetween};
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
