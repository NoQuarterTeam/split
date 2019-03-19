import React, { memo, Fragment, FC } from "react"
import { Link, Match } from "@reach/router"

import styled, { media, lighten } from "../application/theme"

import IconPlus from "../assets/images/icon-plus.svg"
import IconLogo from "../assets/images/icon-logo.svg"

import useAppContext from "../lib/hooks/useAppContext"
import { useLogout } from "../lib/graphql/user/hooks"

function Sidebar({ open }: { open: boolean }) {
  const { user } = useAppContext()
  const logout = useLogout()

  return (
    <StyledSidebar open={open}>
      <h2>
        <img src={IconLogo} width={30} />
        Split
      </h2>
      <div>
        <NavLink to="/">Balance</NavLink>
        {user.houseId && (
          <Fragment>
            <NavLink to="/new-cost">
              New cost <StyledIcon src={IconPlus} />
            </NavLink>
            <NavLink to="/costs">Costs</NavLink>
          </Fragment>
        )}
        <NavLink to="/settings">Settings</NavLink>
        <div
          tabIndex={0}
          onClick={() => logout()}
          style={{ cursor: "pointer" }}
        >
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

const NavLink: FC<{ to: string }> = ({ to = "/", children }) => {
  return (
    <Match path={to}>
      {({ match }) => (
        <Link to={to}>
          <StyledLink active={!!match}>{children}</StyledLink>
        </Link>
      )}
    </Match>
  )
}

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
  background-color: white;
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
    p.active ? `2px solid ${p.theme.colorPink}` : "2px solid transparent"};

  &:hover {
    border-left: ${p =>
      p.active
        ? `2px solid ${p.theme.colorPink}`
        : `2px solid ${lighten(0.25, p.theme.colorPink)}`};
  }
`

const StyledIcon = styled.img`
  height: 22px;
  vertical-align: middle;
  border-radius: 50%;
  box-shadow: 0 0 10px 0 ${p => lighten(0.25, p.theme.colorPink)}};
  margin-left: ${p => p.theme.paddingM};
`

const StyledAnchor = styled.a`
  color: black;

  &:hover {
    color: ${p => p.theme.colorPink};
  }
`
