import React, { FC } from "react"
import styled from "../../application/theme"

const Center: FC = ({ children }) => {
  return <StyledCenter>{children}</StyledCenter>
}

export default Center

const StyledCenter = styled.div`
  ${p => p.theme.flexCenter};
`
