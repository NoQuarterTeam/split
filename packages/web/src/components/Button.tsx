import React, { memo, ButtonHTMLAttributes } from "react"
import styled, { css } from "../application/theme"

export type Variant = "primary" | "submit" | "icon"

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  loading?: boolean
  disabled?: boolean
  full?: boolean
}

function Button({
  variant = "primary",
  loading = false,
  disabled = false,
  ...props
}: IButtonProps) {
  return (
    <StyledButton
      variant={variant}
      loading={loading}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? "loading..." : props.children}
    </StyledButton>
  )
}

export default memo(Button)

const StyledButton = styled.button<IButtonProps>`
  outline: 0;
  border: 0;
  letter-spacing: 1px;
  color: white;
  cursor: ${p => (p.disabled ? "default" : "pointer")};
  width: ${p => (!p.full ? "auto" : "100%")};
  border-radius: ${p => p.theme.borderRadius};
  font-size: ${p => p.theme.textM};
  background-color: ${p => p.theme.colorPrimary};
  padding: ${p => p.theme.paddingM};
`
