import React, { FC } from "react"
import { media } from "../../application/theme"
import { styled } from "@noquarter/ui"

interface DisplayProps {
  size: "sm" | "md" | "lg" | "xl"
  hide?: boolean
}

const Display: FC<DisplayProps> = ({ children, size, hide = false }) => {
  return (
    <StyledDisplay size={size} hide={hide}>
      {children}
    </StyledDisplay>
  )
}

export default Display

const StyledDisplay = styled.div<DisplayProps>`
  display: ${p => (p.hide ? "block" : "none")};

  ${p => media.greaterThan(p.size)`
    display: ${p.hide ? "none" : "block"};
  `}
`
