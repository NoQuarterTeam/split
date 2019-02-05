import React, { memo, InputHTMLAttributes } from "react"
import styled from "../application/theme"

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {}

function Radio(props: RadioProps) {
  return (
    <StyledLabel htmlFor={props.id}>
      <input type="radio" {...props} style={{ opacity: 0 }} />
      <StyledRadio />
    </StyledLabel>
  )
}

export default memo(Radio)

const StyledLabel = styled.label`
  user-select: none;
  cursor: pointer;
  position: relative;

  input:checked ~ div:after {
    opacity: 1;
  }

  input:focus ~ div {
    border: 2px solid ${p => p.theme.colorSecondary};
  }
`

const StyledRadio = styled.div`
  height: 26px;
  width: 26px;
  border-radius: 50%;
  border: 2px solid ${p => p.theme.colorHighlight};

  &:hover {
    border: 2px solid ${p => p.theme.colorSecondary};
  }

  &::after {
    content: "";
    transition: all 200ms;
    position: absolute;
    opacity: 0;
    top: 6px;
    left: 6px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    box-shadow: 0 0 5px 0 rgba(237, 96, 211, 0.5);
    background-color: ${p => p.theme.colorSecondary};
  }
`
