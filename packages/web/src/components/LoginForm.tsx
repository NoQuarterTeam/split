import React, { memo, useState, Fragment } from "react"
import { RouteComponentProps } from "@reach/router"
import { useMutation } from "react-apollo-hooks"
import styled from "../application/theme"

import IconLogo from "../assets/images/icon-logo.svg"
import { LOGIN, ME, REGISTER } from "../graphql/user/queries"
import { Login, Register } from "../graphql/types"
import Button from "./Button"
import Input from "./Input"

function LoginForm(_: RouteComponentProps) {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")

  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [isSignUp, setIsSignUp] = useState<boolean>(false)

  const login = useMutation<Login.Mutation, Login.Variables>(LOGIN, {
    variables: { data: { email, password } },
    update: (cache, res) => {
      if (res.data) {
        const me = res.data.login
        cache.writeQuery({ query: ME, data: { me } })
      }
    },
  })

  const register = useMutation<Register.Mutation, Register.Variables>(
    REGISTER,
    {
      variables: { data: { email, password, firstName, lastName } },
      update: (cache, res) => {
        if (res.data) {
          const me = res.data.register
          cache.writeQuery({ query: ME, data: { me } })
        }
      },
    },
  )

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
    if (isSignUp) {
      register().catch(registerError => {
        setLoading(false)
        setError(registerError.message.split(":")[1])
      })
    } else {
      login().catch(loginError => {
        setLoading(false)
        setError(loginError.message.split(":")[1])
      })
    }
  }

  return (
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
      {isSignUp && (
        <Fragment>
          <Input
            label="First name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            type="text"
            required={true}
            placeholder="Jim"
          />
          <br />

          <Input
            label="Last name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            type="text"
            required={true}
            placeholder="Sebe"
          />
        </Fragment>
      )}
      <br />
      <Button loading={loading} full={true}>
        {isSignUp ? "Sign up" : "Login"}
      </Button>
      {error && <StyledError>{error}</StyledError>}
      <StyledLink tabIndex={0} onClick={() => setIsSignUp(!isSignUp)}>
        {!isSignUp ? "Sign up" : "Login"}
      </StyledLink>
    </StyledForm>
  )
}

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

const StyledLink = styled.a`
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

export default memo(LoginForm)
