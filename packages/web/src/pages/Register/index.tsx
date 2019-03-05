import React, { memo, useState } from "react"
import { RouteComponentProps, Link } from "@reach/router"
import queryString from "query-string"

import styled from "../../application/theme"

import IconLogo from "../../assets/images/icon-logo.svg"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { useRegister } from "../../lib/graphql/user/hooks"
import { useCheckHouse } from "../../lib/graphql/house/hooks"
import { GraphQLError } from "graphql"

function Register(props: RouteComponentProps) {
  let inviteHouseId: string | null = null
  const queries = queryString.parse(location.search)
  if (queries.invite) {
    inviteHouseId = queries.invite as string
  }
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")

  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const { house, checkHouseError } = useCheckHouse(inviteHouseId)
  const register = useRegister()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
    register({
      variables: {
        data: { email, password, firstName, lastName, inviteHouseId },
      },
    })
      .then(() => props.navigate!("/"))
      .catch((registerError: GraphQLError) => {
        setLoading(false)
        setError(registerError.message.split(":")[1])
      })
  }

  return (
    <StyledRegister>
      <StyledForm onSubmit={handleSubmit}>
        <StyledHeader>
          <img src={IconLogo} width={30} alt="logo" />
          Split
        </StyledHeader>
        {house ? (
          <StyledInviteHeader>
            You are being invited to join {house.name}
          </StyledInviteHeader>
        ) : (
          checkHouseError && (
            <StyledInviteHeader>Invalid invite code</StyledInviteHeader>
          )
        )}
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
        <br />
        <Button disabled={loading} loading={loading} full={true}>
          Sign up
        </Button>
        {error && <StyledError>{error}</StyledError>}
        <Link to="/login">
          <StyledLink>Login</StyledLink>
        </Link>
      </StyledForm>
    </StyledRegister>
  )
}

export default memo(Register)

const StyledRegister = styled.div`
  min-height: 100vh;
  width: 100%;
`
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

const StyledInviteHeader = styled.h2`
  width: 100%;
  text-align: center;
  margin-bottom: ${p => p.theme.paddingXL};
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
