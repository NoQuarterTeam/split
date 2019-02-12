import React, { FC } from "react"
import styled from "../../application/theme"

type ColumnProps = {
  flex: number
}

const Column: FC<ColumnProps> = ({ children, flex = 1 }) => {
  return <StyledColumn flex={flex}>{children}</StyledColumn>
}

export default Column

const StyledColumn = styled.div<{ flex: number }>`
  flex: ${p => p.flex};
`
