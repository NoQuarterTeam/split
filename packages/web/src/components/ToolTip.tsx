import React, { memo, ReactNode } from "react"
import styled from "../application/theme"

type ToolTipProps = {
  children: ReactNode
  message: string
}

function ToolTip({ children, message }: ToolTipProps) {
  return (
    <StyledToolTip>
      <StyledMessage>{message}</StyledMessage>
      {children}
    </StyledToolTip>
  )
}

export default memo(ToolTip)

const StyledMessage = styled.span`
  position: absolute;
  transition: 400ms all;
  right: -75px;
  top: -30px;
  width: max-content;
  color: white;
  opacity: 0;
  font-size: ${p => p.theme.textS};
  padding: ${p => `${p.theme.paddingS} ${p.theme.paddingM}`};
  background-color: ${p => p.theme.colorHeader};
  border-radius: ${p => p.theme.borderRadius};
`

const StyledToolTip = styled.div`
  position: relative;

  &:hover {
    ${StyledMessage} {
      opacity: 1;
    }
  }
`
