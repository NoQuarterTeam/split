import React, { memo } from "react"
import styled from "../application/theme"

function Menu() {
  return (
    <StyledMenu>
      <div>thing1</div>
      <div>thing2</div>
    </StyledMenu>
  )
}

export default memo(Menu)

const StyledMenu = styled.div`
  position: absolute;
  bottom: -10px;
  right: -10px;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: ${p => p.theme.borderRadius};
`
