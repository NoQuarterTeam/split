import React, { memo } from "react"
import styled, { lighten } from "../application/theme"

type AlertProps = {
  text: string
}
function Alert({ text }: AlertProps) {
  return <StyledAlert>{text}</StyledAlert>
}

const StyledAlert = styled.div`
  width: max-content;
  border-radius: 7px;
  text-align: center;
  padding: 8px ${p => p.theme.paddingL};
  font-weight: ${p => p.theme.fontBold};
  font-size: ${p => p.theme.textS};
  color: ${p => p.theme.colorPink};
  background-color: ${p => lighten(0.25, p.theme.colorPink)};
`
export default memo(Alert)
