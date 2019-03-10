import React, { FC } from "react"
import Center from "./styled/Center"
import styled from "../application/theme"
import IconLogo from "../assets/images/icon-logo.svg"

type AuthFormProps = {
  handleSubmit: (e: any) => void
}
const AuthForm: FC<AuthFormProps> = ({ children, handleSubmit }) => {
  return (
    <Center style={{ height: "100vh" }}>
      <StyledForm onSubmit={handleSubmit}>
        <StyledHeader>
          <img src={IconLogo} width={30} alt="logo" />
          Split
        </StyledHeader>
        {children}
      </StyledForm>
    </Center>
  )
}

export default AuthForm

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
