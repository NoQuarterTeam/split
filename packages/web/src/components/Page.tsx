import React, { FC, useState } from "react"
import styled, { media } from "../application/theme"
import Sidebar from "./Sidebar"

import IconMenu from "../assets/images/icon-menu.svg"

interface PageProps {
  activePage: string
}

const Page: FC<PageProps> = ({ children, activePage }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  return (
    <StyledPage>
      <Sidebar activePage={activePage} open={sidebarOpen} />
      <StyledPageContent>{children}</StyledPageContent>
      {sidebarOpen && <StyledOverlay onClick={() => setSidebarOpen(false)} />}
      <StyledMenu onClick={() => setSidebarOpen(true)}>
        <img src={IconMenu} width={30} alt="menu" />
      </StyledMenu>
    </StyledPage>
  )
}

export default Page

const StyledPage = styled.div`
  height: 100vh;
  width: 100vw;
  padding-left: 0;
  padding-top: 50px;
  position: relative;
  display: flex;

  ${media.greaterThan("sm")`
    padding-left: 220px;
    padding-top: 0;
  `}
`

const StyledMenu = styled.button`
  display: block;
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: transparent;
  border: 0;
  cursor: pointer;

  ${media.greaterThan("sm")`
    display: none;
  `}
`

const StyledOverlay = styled.div`
  background-color: black;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.2;
`

const StyledPageContent = styled.div`
  width: 100%;
  position: relative;
  ${p => p.theme.flexCenter};
`
