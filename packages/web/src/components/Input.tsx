import React, { InputHTMLAttributes, forwardRef, Ref, memo } from "react"
import styled from "../application/theme"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  style?: any
  prefix?: string
}

function Input(
  { label, prefix = "", ...inputProps }: InputProps,
  ref: Ref<HTMLInputElement>,
) {
  return (
    <StyledContainer>
      {label && <StyledLabel>{label}</StyledLabel>}
      <div style={{ position: "relative" }}>
        <StyledPrefix>{prefix}</StyledPrefix>
        <StyledInput {...inputProps} ref={ref} hasPrefix={!!prefix} />
      </div>
    </StyledContainer>
  )
}

export default memo(forwardRef(Input))

const StyledContainer = styled.div`
  width: 100%;
  padding: ${p => p.theme.paddingS};
`

const StyledLabel = styled.label`
  color: grey;
  font-size: ${p => p.theme.textS};
`

const StyledInput = styled.input<{ hasPrefix?: boolean }>`
  border: 0;
  width: 100%;
  outline: 0;
  background-color: transparent;
  font-size: ${p => p.theme.textM};
  padding: ${p => p.theme.paddingM} 0;
  ${p => p.hasPrefix && "padding-left: 16px"};
  ${p => p.type === "date" && "padding-bottom: 7px"};
  border-bottom: 2px solid ${p => p.theme.colorHighlight};
  -webkit-appearance: none;

  &::placeholder {
    color: lightgrey;
  }

  &:focus {
    border-bottom: 2px solid ${p => p.theme.colorSecondary};
  }
`

const StyledPrefix = styled.span`
  position: absolute;
  left: 0;
  top: 11px;
  color: grey;
`
