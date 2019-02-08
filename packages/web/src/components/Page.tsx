import React, { memo, ReactNode } from "react"
import styled from "../application/theme"
import Sidebar from "./Sidebar"

interface PageProps {
  children: ReactNode
  activePage: string
}

function Page({ children, activePage }: PageProps) {
  return (
    <StyledPage>
      <Sidebar active={activePage} />
      <StyledPageContent>{children}</StyledPageContent>
    </StyledPage>
  )
}

export default memo(Page)

const StyledPage = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
`

const StyledPageContent = styled.div`
  width: calc(100% - 220px);
  ${p => p.theme.flexCenter};
`
