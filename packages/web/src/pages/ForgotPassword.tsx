import React, { useState, Fragment, FC } from "react"
import { RouteComponentProps, Link } from "@reach/router"
import { GraphQLError } from "graphql"
import { styled, Button, Input } from "@noquarter/ui"

import AuthForm from "../components/AuthForm"
import { useForgotPassword } from "../lib/graphql/user/hooks"

const ForgotPassword: FC<RouteComponentProps> = () => {
  const [email, setEmail] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const [forgotPassword] = useForgotPassword()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
    forgotPassword({
      variables: { email },
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
        <StyledText>
          We've sent you a link by pigeon mail, good luck!
        </StyledText>
      ) : (
        <Fragment>
          <StyledText>
            What is your email? We'll send you a link to reset your password
          </StyledText>
          <br />
          <Input
            label="Email"
            value={email}
            onChange={setEmail}
            type="email"
            required={true}
            placeholder="jim@gmail.com"
          />
          <br />
          <Button loading={loading} full={true}>
            Send reset link
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

export default ForgotPassword

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
  color: ${p => p.theme.colorText};
  padding: ${p => p.theme.paddingM};
  font-size: ${p => p.theme.textS};
`
