import React, { FC } from "react"
import { styled } from "@noquarter/ui"

import Logo from "./Logo"
import Center from "./styled/Center"
import Tile from "./styled/Tile"

interface AuthFormProps {
  handleSubmit: (e: any) => void
}
const AuthForm: FC<AuthFormProps> = ({ children, handleSubmit }) => {
  return (
    <StyledAuthContainer>
      <Center style={{ height: "100vh" }}>
        <Tile style={{ width: 450 }}>
          <StyledForm onSubmit={handleSubmit}>
            <StyledHeader>
              <Logo />
            </StyledHeader>
            {children}
          </StyledForm>
        </Tile>
      </Center>
    </StyledAuthContainer>
  )
}

export default AuthForm

const StyledAuthContainer = styled.div`
  background-color: ${p => p.theme.colorBackground};
`
const StyledForm = styled.form`
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
