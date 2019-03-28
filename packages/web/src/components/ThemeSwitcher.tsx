import React from "react"
import useThemeContext from "../lib/hooks/useThemeContext"
import Switch from "./Switch"
import styled from "../application/theme"

function ThemeSwitcher() {
  const { toggleTheme, isDark } = useThemeContext()
  return (
    <StyledSwitcher>
      <StyledLabel>Dark mode</StyledLabel>
      <Switch on={isDark} handleClick={toggleTheme} />
    </StyledSwitcher>
  )
}

export default ThemeSwitcher

const StyledSwitcher = styled.div`
  ${p => p.theme.flexCenter};
`

const StyledLabel = styled.div`
  padding-right: ${p => p.theme.paddingM};
  color: ${p => p.theme.colorText};
`
