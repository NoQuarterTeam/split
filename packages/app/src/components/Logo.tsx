import React from "react"
import styled from "../application/theme"

function Logo() {
  return (
    <StyledLogoContainer>
      <StyledImage
        resizeMode="contain"
        source={require("../assets/images/icon-logo.png")}
      />
      <StyledLogo>Split</StyledLogo>
    </StyledLogoContainer>
  )
}

export default Logo

const StyledLogoContainer = styled.View`
  ${p => p.theme.flexCenter};
`

const StyledImage = styled.Image`
  width: 40px;
`
const StyledLogo = styled.Text`
  font-size: ${p => p.theme.textL};
  color: ${p => p.theme.colorText};
`
