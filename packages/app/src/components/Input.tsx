import React, { forwardRef, memo } from "react"
import styled from "../application/theme"
import { TextInputProps } from "react-native"

interface InputProps extends TextInputProps {
  label?: string
  style?: any
  prefix?: string
}

function Input({ label, prefix = "", ...inputProps }: InputProps) {
  return (
    <StyledContainer>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledPrefix>{prefix}</StyledPrefix>
      <StyledInput {...inputProps} hasPrefix={!!prefix} />
    </StyledContainer>
  )
}

export default memo(forwardRef(Input))

const StyledContainer = styled.View`
  width: 100%;
  padding: ${p => p.theme.paddingS} 0;
`

const StyledLabel = styled.Text`
  color: ${p => p.theme.colorLabel};
  font-size: ${p => p.theme.textS};
`

const StyledInput = styled.TextInput<{ hasPrefix?: boolean }>`
  border: 0;
  width: 100%;
  background-color: transparent;
  border-radius: 0;
  color: ${p => p.theme.colorText};
  font-size: ${p => p.theme.textM};
  padding: ${p => p.theme.paddingM} 0;
  ${p => p.hasPrefix && "padding-left: 16px"};
  border-top-left-radius: ${p => p.theme.borderRadius};
  border-top-right-radius: ${p => p.theme.borderRadius};
`

const StyledPrefix = styled.Text`
  position: absolute;
  left: 0;
  top: 11px;
  color: ${p => p.theme.colorLabel};
`
