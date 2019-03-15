import React, { memo } from "react"
import styled from "../application/theme"

type SwitchProps = {
  handleClick: () => void
  on: boolean
}

function Switch({ handleClick, on }: SwitchProps) {
  return (
    <StyledSwitch type="button" onClick={handleClick} on={on}>
      <StyledToggle on={on} />
    </StyledSwitch>
  )
}

export default memo(Switch)

const StyledSwitch = styled.button<{ on: boolean }>`
  position: relative;
  width: 32px;
  height: 20px;
  border-radius: 20px;
  outline: 0;
  padding: 0 2px;
  transition: 200ms all;
  background-color: ${p => (p.on ? p.theme.colorPink : p.theme.colorLabel)};

  &:hover,
  &:focus {
    box-shadow: 0 0 5px 1px
      ${p => (p.on ? "rgba(237, 96, 211, 0.5)" : "rgba(0, 0, 10, 0.1)")};
  }
`

const StyledToggle = styled.div<{ on: boolean }>`
  position: absolute;
  top: 2px;
  left: 2px;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  transition: 200ms all;
  background-color: white;

  transform: ${p => (p.on ? "translateX(12px)" : "translateX(0)")};
`
