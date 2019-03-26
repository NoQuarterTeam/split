import React from "react"
import styled, { darken } from "../application/theme"

interface ErrorBannerProps {
  text: string
}

function ErrorBanner({ text }: ErrorBannerProps) {
  return <StyledErrorBanner>{text}</StyledErrorBanner>
}

export default ErrorBanner

const StyledErrorBanner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  color: white;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
  font-size: ${p => p.theme.textS};
  padding: ${p => p.theme.paddingL};
  background-color: ${p => darken(0.1, p.theme.colorBlue)};
`
