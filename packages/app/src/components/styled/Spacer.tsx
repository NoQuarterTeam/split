import React, { FC } from "react"
import styled from "../../application/theme"

const Spacer: FC = () => <StyledSpacer />

export default Spacer

const StyledSpacer = styled.View`
  margin-bottom: ${p => p.theme.paddingXL};
`
