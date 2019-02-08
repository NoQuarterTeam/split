import React, { ReactNode } from "react"
import styled from "../application/theme"

type ColumnProps = {
  children?: ReactNode
  flex: number
}

function Column({ children, flex = 1 }: ColumnProps) {
  return <StyledColumn flex={flex}>{children}</StyledColumn>
}

export default Column

const StyledColumn = styled.div<{ flex: number }>`
  flex: ${p => p.flex};
`
