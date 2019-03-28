import React, { FC } from "react"
import Center from "./styled/Center"
import styled from "../application/theme"
import Logo from "./Logo"

interface AuthFormProps {
  handleSubmit: (e: any) => void
}
const AuthForm: FC<AuthFormProps> = ({ children, handleSubmit }) => {
  return (
    <StyledAuthContainer>
      <Center style={{ height: "100vh" }}>
        <StyledForm onSubmit={handleSubmit}>
          <StyledHeader>
            <Logo />
          </StyledHeader>
          {children}
        </StyledForm>
      </Center>
    </StyledAuthContainer>
  )
}

export default AuthForm

const StyledAuthContainer = styled.div`
  background-color: ${p => p.theme.colorPage};
`
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
