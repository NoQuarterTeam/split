import React, { FC } from "react"
import Center from "./styled/Center"
import styled from "../application/theme"
import Logo from "./Logo"

interface AuthFormProps {
  handleSubmit: (e: any) => void
}
const AuthForm: FC<AuthFormProps> = ({ children, handleSubmit }) => {
  return (
    <Center style={{ height: "100vh" }}>
      <StyledForm onSubmit={handleSubmit}>
        <StyledHeader>
          <Logo />
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
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: ${p => p.theme.paddingL};
`

const StyledHeader = styled.div`
  margin-bottom: ${p => p.theme.paddingXL};
`
