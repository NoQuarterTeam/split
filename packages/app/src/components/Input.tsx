import React, { memo, forwardRef, Ref } from "react"
import { TextInputProps, TextInput } from "react-native"

import styled, { lighten } from "../application/theme"
import useAppContext from "../lib/hooks/useAppContext"

interface InputProps extends TextInputProps {
  label?: string
  style?: any
  prefix?: string
}

function Input(
  { label, prefix, style, ...inputProps }: InputProps,
  ref: Ref<TextInput>,
) {
  const { theme } = useAppContext()
  return (
    <StyledContainer>
      {label ? <StyledLabel>{label}</StyledLabel> : null}
      {prefix ? <StyledPrefix>{prefix}</StyledPrefix> : null}
      <StyledInput
        ref={ref}
        hasPrefix={!!prefix}
        placeholderTextColor={theme.colorPlaceholder}
        style={style}
        {...inputProps}
      />
    </StyledContainer>
  )
}

export default memo(forwardRef(Input))

const StyledContainer = styled.View`
  width: 100%;
  padding: ${p => p.theme.paddingS} 0;
  border-bottom-width: 2px;
  border-color: ${p => lighten(0.25, p.theme.colorPink)};
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
  padding-top: ${p => p.theme.paddingM};
  padding-bottom: ${p => p.theme.paddingS};
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
