import React, { FC } from "react"
import styled from "../../application/theme"

type DividerProps = {}

const Divider: FC<DividerProps> = () => {
  return <StyledDivider />
}

export default Divider

const StyledDivider = styled.div`
  width: 100%;
  height: 2px;
  margin: ${p => p.theme.paddingM} 0;
  padding: 0 ${p => p.theme.paddingM};
  background-color: ${p => p.theme.colorBackground};
`
