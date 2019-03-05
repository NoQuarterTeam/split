import React, { useState, Fragment } from "react"
import styled from "styled-components"
import { RouteComponentProps, Link } from "@reach/router"
import { GraphQLError } from "graphql"

import IconLogo from "../../assets/images/icon-logo.svg"

import Center from "../../components/styled/Center"
import Input from "../../components/Input"
import Button from "../../components/Button"
import { useForgotPassword } from "../../lib/graphql/user/hooks"

function ForgotPassword(props: RouteComponentProps) {
  const [email, setEmail] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const forgotPassword = useForgotPassword()

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
    <Center style={{ height: "100vh" }}>
      <StyledForm onSubmit={handleSubmit}>
        <StyledHeader>
          <img src={IconLogo} width={30} alt="logo" />
          Split
        </StyledHeader>
        {success ? (
          <p>We've sent you a link by pigeon mail, good luck!</p>
        ) : (
          <Fragment>
            <p>
              What is your email? We'll send you a link to reset your password
            </p>
            <br />
            <Input
              label="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
      </StyledForm>
    </Center>
  )
}

export default ForgotPassword

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
