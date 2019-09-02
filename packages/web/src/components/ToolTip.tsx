import React, { memo, ReactNode } from "react"
import { styled } from "@noquarter/ui"

const ToolTip = ({
  children,
  message,
}: {
  children: ReactNode
  message: string
}) => {
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
  right: 0;
  top: 0;
  opacity: 0;
  transition: 400ms all;
  color: white;
  width: max-content;
  pointer-events: none;
  transform: translate(45%, -120%);

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
