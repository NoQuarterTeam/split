import React, { memo, ReactNode } from "react"
import styled from "../application/theme"

interface PageProps {
  children: ReactNode
}

function Page({ children }: PageProps) {
  return <StyledPage>{children}</StyledPage>
}

const StyledPage = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
  align-items: center;
  background-color: ${p => p.theme.colorBackground};
`

export default memo(Page)
