import React, { memo, useState, FC } from "react"
import { RouteComponentProps, Link } from "@reach/router"
import { GraphQLError } from "graphql"

import { styled, Button, Input } from "@noquarter/ui"

import AuthForm from "../components/AuthForm"
import { useCheckInvite } from "../lib/graphql/invite/hooks"
import { useRegister } from "../lib/graphql/user/hooks"

const Register: FC<RouteComponentProps<{ token?: string }>> = ({
  token = "",
}) => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")

  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const { house, checkInviteError } = useCheckInvite(token)
  const [register] = useRegister()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
    register({
      variables: {
        data: { email, password, firstName, lastName, inviteId: token },
      },
    }).catch((registerError: GraphQLError) => {
      setLoading(false)
      setError(registerError.message.split(":")[1])
    })
  }

  return (
    <AuthForm handleSubmit={handleSubmit}>
      {house ? (
        <StyledInviteHeader>
          You are being invited to join <br />
          <span>{house.name}</span>
        </StyledInviteHeader>
      ) : (
        checkInviteError && (
          <StyledInviteHeader>Invalid invite code</StyledInviteHeader>
        )
      )}
      <Input
        label="Email"
        value={email}
        onChange={setEmail}
        type="email"
        required={true}
        placeholder="jim@gmail.com"
      />
      <br />
      <Input
        label="Password"
        value={password}
        onChange={setPassword}
        type="password"
        required={true}
        placeholder="********"
      />
      <Input
        label="First name"
        value={firstName}
        onChange={setFirstName}
        type="text"
        required={true}
        placeholder="Jim"
      />
      <br />

      <Input
        label="Last name"
        value={lastName}
        onChange={setLastName}
        type="text"
        required={true}
        placeholder="Sebe"
      />
      <br />
      <Button disabled={loading} loading={loading} full={true}>
        Sign up
      </Button>
      {error && <StyledError>{error}</StyledError>}
      <StyledLinks>
        <Link to="/login">
          <StyledLink>Login</StyledLink>
        </Link>
      </StyledLinks>
    </AuthForm>
  )
}

export default memo(Register)

const StyledInviteHeader = styled.h2`
  width: 100%;
  text-align: center;
  font-weight: normal;
  margin-bottom: ${p => p.theme.paddingXL};

  span {
    font-weight: ${p => p.theme.fontExtraBold};
  }
`

const StyledLink = styled.div`
  text-align: right;
  width: 100%;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  color: ${p => p.theme.colorText};
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
  color: ${p => p.theme.colorText};
  padding: ${p => p.theme.paddingM};
  font-size: ${p => p.theme.textS};
`

const StyledLinks = styled.div`
  width: 100%;
  padding: ${p => p.theme.paddingL} 0;
  ${p => p.theme.flexBetween};
`
