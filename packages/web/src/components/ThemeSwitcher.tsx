import React from "react"
import useAppContext from "../lib/hooks/useAppContext"
import { styled, Switch } from "@noquarter/ui"

function ThemeSwitcher() {
  const { toggleTheme, isDark } = useAppContext()
  return (
    <StyledSwitcher>
      <StyledLabel>Dark mode</StyledLabel>
      <Switch on={isDark} onChange={toggleTheme} />
    </StyledSwitcher>
  )
}

export default ThemeSwitcher

const StyledSwitcher = styled.div`
  display: flex;
  align-items: center;
`

const StyledLabel = styled.div`
  padding-right: ${p => p.theme.paddingM};
  color: ${p => p.theme.colorText};
`
