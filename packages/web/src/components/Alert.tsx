import React, { memo } from "react"
import styled from "../application/theme"

type AlertProps = {
  text: string
}
function Alert({ text }: AlertProps) {
  return <StyledAlert>{text}</StyledAlert>
}

const StyledAlert = styled.div`
  position: absolute;
  top: -50px;
  left: -50px;
  border-radius: 7px;
  text-align: center;
  padding: 8px ${p => p.theme.paddingL};
  font-weight: ${p => p.theme.fontBold};
  font-size: ${p => p.theme.textS};
  color: ${p => p.theme.colorSecondary};
  background-color: ${p => p.theme.colorHighlight};
`
export default memo(Alert)
