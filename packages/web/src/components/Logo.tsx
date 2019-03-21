import React from "react"
import IconLogo from "../assets/images/icon-logo.svg"
import styled from "../application/theme"

function Logo() {
  return (
    <StyledLogo>
      <img src={IconLogo} width={30} alt="logo" />
      Split
    </StyledLogo>
  )
}

export default Logo

const StyledLogo = styled.h1``
