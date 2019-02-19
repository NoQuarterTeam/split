import React, { memo, Fragment } from "react"
import { Link } from "@reach/router"

import IconPlus from "../assets/images/icon-plus.svg"
import IconLogo from "../assets/images/icon-logo.svg"

import styled, { media } from "../application/theme"
import useUserContext from "../lib/hooks/useUserContext"
import { useLogoutMutation } from "../lib/graphql/user/hooks"

function Sidebar({ activePage, open }: { activePage: string; open: boolean }) {
  const user = useUserContext()
  const house = user!.houseId
  const logout = useLogoutMutation()
  const handleLogout = () => {
    logout()
  }

  return (
    <StyledSidebar open={open}>
      <h2>
        <img src={IconLogo} width={30} />
        Split
      </h2>
      <div>
        <Link to="/">
          <StyledLink active={activePage === "balance"}>Balance</StyledLink>
        </Link>
        {house && (
          <Fragment>
            <Link to="/new-cost">
              <StyledLink>
                New cost <StyledIcon src={IconPlus} />
              </StyledLink>
            </Link>
            <Link to="/costs">
              <StyledLink active={activePage === "costs"}>Costs</StyledLink>
            </Link>
          </Fragment>
        )}
        <Link to="/profile">
          <StyledLink active={activePage === "settings"}>Settings</StyledLink>
        </Link>
        <div tabIndex={0} onClick={handleLogout} style={{ cursor: "pointer" }}>
          <StyledLink>Logout</StyledLink>
        </div>
      </div>
      <h6>
        Built by{" "}
        <StyledAnchor
          tabIndex={-1}
          target="_black"
          rel="no-follow"
          href="https://www.noquarter.co"
        >
          No Quarter
        </StyledAnchor>
      </h6>
    </StyledSidebar>
  )
}

export default memo(Sidebar)

const StyledSidebar = styled.div<{ open: boolean }>`
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  height: 100%;
  width: 220px;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${p => p.theme.colorLightGrey};
  padding: ${p => p.theme.paddingXL};
  display: ${p => (p.open ? "flex" : "none")};

  ${media.greaterThan("sm")`
    display: flex;
  `}
`

const StyledLink = styled.div<{ active?: boolean }>`
  margin: ${p => p.theme.paddingL} 0;
  color: ${p => p.theme.colorHeader};
  padding-left: ${p => p.theme.paddingM};
  font-size: ${p => p.theme.textM};
  border-left: ${p =>
    p.active ? `2px solid ${p.theme.colorSecondary}` : "2px solid transparent"};

  &:hover {
    border-left: ${p =>
      p.active
        ? `2px solid ${p.theme.colorSecondary}`
        : `2px solid ${p.theme.colorHighlight}`};
  }
`

const StyledIcon = styled.img`
  height: 22px;
  vertical-align: middle;
  border-radius: 50%;
  box-shadow: 0 0 10px 0 ${p => p.theme.colorHighlight};
  margin-left: ${p => p.theme.paddingM};
`

const StyledAnchor = styled.a`
  color: black;

  &:hover {
    color: ${p => p.theme.colorSecondary};
  }
`
