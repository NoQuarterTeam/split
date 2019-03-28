import React, { memo, ReactNode } from "react"
import styled from "../application/theme"

interface ToolTipProps {
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
  right: 0;
  top: 0;
  transform: translate(45%, -120%);
  width: max-content;
  color: white;
  opacity: 0;
  pointer-events: none;

  font-size: ${p => p.theme.textS};
  padding: ${p => `${p.theme.paddingS} ${p.theme.paddingM}`};
  background-color: ${p => p.theme.colorText};
  border-radius: ${p => p.theme.borderRadius};

  &:after {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
  }

  &:after {
    border-width: 5px;
    margin-left: -10px;
    border-top-color: ${p => p.theme.colorText};
  }
`

const StyledToolTip = styled.div`
  &:hover {
    ${StyledMessage} {
      opacity: 1;
    }
  }
`
