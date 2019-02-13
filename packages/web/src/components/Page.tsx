import React, { FC } from "react"
import styled from "../application/theme"
import Sidebar from "./Sidebar"

interface PageProps {
  activePage: string
}

const Page: FC<PageProps> = ({ children, activePage }) => {
  return (
    <StyledPage>
      <Sidebar active={activePage} />
      <StyledPageContent>{children}</StyledPageContent>
    </StyledPage>
  )
}

export default Page

const StyledPage = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
`

const StyledPageContent = styled.div`
  width: calc(100% - 220px);
  position: relative;
  ${p => p.theme.flexCenter};
`
