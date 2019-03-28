import React, { useState, Fragment, FC } from "react"
import { RouteComponentProps, Link } from "@reach/router"
import { GraphQLError } from "graphql"
import { useResetPassword } from "@split/connector"

import styled from "../../application/theme"

import Input from "../../components/Input"
import Button from "../../components/Button"
import AuthForm from "../../components/AuthForm"

interface ResetPasswordProps extends RouteComponentProps {
  token?: string
}

const ResetPassword: FC<ResetPasswordProps> = props => {
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const resetPassword = useResetPassword()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
    if (!password || !props.token) return // valies
    resetPassword({
      variables: { data: { token: props.token, password } },
    })
      .then(() => {
        setLoading(false)
        setSuccess(true)
      })
      .catch((loginError: GraphQLError) => {
        setLoading(false)
        setError(loginError.message.split(":")[1])
      })
  }
  return (
    <AuthForm handleSubmit={handleSubmit}>
      {success ? (
        <StyledText>Password updated! Try logging in now.</StyledText>
      ) : (
        <Fragment>
          <StyledText>
            Enter a new password, try not forgetting it this time!
          </StyledText>
          <br />
          <Input
            label="New password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            required={true}
            placeholder="********"
          />
          <br />
          <Button loading={loading} full={true}>
            Submit
          </Button>
          {error && <StyledError>{error}</StyledError>}
        </Fragment>
      )}
      <StyledLinks>
        <Link to="/login">
          <StyledLink>Login</StyledLink>
        </Link>
      </StyledLinks>
    </AuthForm>
  )
}

export default ResetPassword

const StyledText = styled.p`
  color: ${p => p.theme.colorText};
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
  padding: ${p => p.theme.paddingM};
  font-size: ${p => p.theme.textS};
`
