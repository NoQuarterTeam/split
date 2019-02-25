import React from "react"
import { RouteComponentProps } from "@reach/router"
import styled from "../application/theme"

import IconLogo from "../assets/images/icon-logo.svg"
import Center from "./styled/Center"
import Button from "./Button"

function Home(props: RouteComponentProps) {
  return (
    <StyledHome>
      <Center style={{ height: "100%", flexDirection: "column" }}>
        <StyledHeader>
          <img src={IconLogo} width={30} alt="logo" />
          <span style={{ paddingRight: 30 }}>Split</span>
        </StyledHeader>
        <br />
        <Button onClick={() => props.navigate!("/login")}>Login</Button>
      </Center>
    </StyledHome>
  )
}

export default Home

const StyledHome = styled.div`
  height: 100vh;
  width: 100%;
`

const StyledHeader = styled.h1`
  margin-bottom: ${p => p.theme.paddingXL};
`
