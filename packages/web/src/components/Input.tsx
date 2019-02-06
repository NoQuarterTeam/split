import React, { memo, InputHTMLAttributes } from "react"
import styled from "../application/theme"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  style?: any
  prefix?: string
}

function Input({ label, prefix, ...inputProps }: InputProps) {
  return (
    <StyledContainer>
      {label && <StyledLabel>{label}</StyledLabel>}
      <div style={{ position: "relative" }}>
        <span
          style={{ position: "absolute", left: -14, top: 11, color: "grey" }}
        >
          {prefix}
        </span>
        <StyledInput {...inputProps} />
      </div>
    </StyledContainer>
  )
}

export default memo(Input)

const StyledContainer = styled.div`
  width: 100%;
  padding: ${p => p.theme.paddingS};
`

const StyledLabel = styled.label`
  text-transform: capitalize;
  color: grey;
  font-size: ${p => p.theme.textS};
`

const StyledInput = styled.input`
  border: 0;
  width: 100%;
  outline: 0;
  font-size: ${p => p.theme.textM};
  background-color: ${p => p.theme.colorBackground};
  padding: ${p => p.theme.paddingM} 0;
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
