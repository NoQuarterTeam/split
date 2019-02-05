import React, { memo, ButtonHTMLAttributes } from "react"
import styled, { css } from "../application/theme"

export type Variant = "primary" | "secondary"

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
      {loading ? "Loading..." : props.children}
    </StyledButton>
  )
}

export default memo(Button)

const StyledButton = styled.button<IButtonProps>`
  outline: 0;
  border: 0;
  letter-spacing: 1px;
  color: white;
  text-align: center;
  border-radius: 100px;
  cursor: ${p => (p.disabled ? "default" : "pointer")};
  width: ${p => (!p.full ? "auto" : "100%")};

  &:focus,
  &:hover {
    opacity: 0.7;
  }

  ${p => getVariantStyles(p.variant!)}
`

const getVariantStyles = (variant: string) => {
  switch (variant) {
    case "primary":
      return primaryStyles
    case "secondary":
      return secondaryStyles
    default:
      return primaryStyles
  }
}

const primaryStyles = css`
  background-color: ${p => p.theme.colorPrimary};
  font-size: ${p => p.theme.textM};
  padding: ${p => `${p.theme.paddingM} ${p.theme.paddingXL}`};
`

const secondaryStyles = css`
  text-transform: uppercase;
  font-weight: ${p => p.theme.fontBlack};
  background-color: ${p => p.theme.colorSecondary};
  font-size: ${p => p.theme.textS};
  padding: ${p => `${p.theme.paddingM} ${p.theme.paddingL}`};
`
