import React, { FC, useState } from "react"
import styled, { media } from "../application/theme"
import Sidebar from "./Sidebar"

import IconMenu from "../assets/images/icon-menu.svg"

const Page: FC = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  return (
    <StyledPage>
      <Sidebar open={sidebarOpen} />
      <StyledPageContent>{children}</StyledPageContent>
      {sidebarOpen && <StyledOverlay onClick={() => setSidebarOpen(false)} />}
      <StyledMenu onClick={() => setSidebarOpen(true)}>
        <img src={IconMenu} width={20} alt="menu" />
      </StyledMenu>
    </StyledPage>
  )
}

export default Page

const StyledPage = styled.div`
  width: 100vw;
  padding-left: 0;
  display: flex;
  height: ${window.innerHeight}px;

  ${media.greaterThan("sm")`
    padding-left: 220px;
    padding-top: 0;
  `}
`

const StyledMenu = styled.button`
  display: block;
  position: fixed;
  display: flex;
  top: 20px;
  left: 20px;
  border: 0;
  cursor: pointer;
  background-color: ${p => p.theme.colorPage};
  padding: ${p => p.theme.paddingM};
  border-radius: ${p => p.theme.borderRadius};
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);

  ${media.greaterThan("sm")`
    display: none;
  `};
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
  min-height: ${window.innerHeight}px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background-color: ${p => p.theme.colorBackground};
`
