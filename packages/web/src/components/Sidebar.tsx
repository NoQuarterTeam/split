import React, { memo } from "react"
import { Link } from "@reach/router"
import IconPlus from "../assets/images/icon-plus.svg"

import styled from "../application/theme"
import { LOGOUT, ME } from "../graphql/user/queries"
import { useMutation } from "react-apollo-hooks"

function Sidebar({ active }: { active: string }) {
  const logout = useMutation(LOGOUT, {
    update: cache => {
      cache.writeQuery({ query: ME, data: { me: null } })
    },
  })
  return (
    <StyledSidebar>
      <h2>Split</h2>
      <div>
        <Link to="/">
          <StyledLink active={active === "dashboard"}>Dashboard</StyledLink>
        </Link>
        <Link to="/new-cost">
          <StyledLink>
            New cost <StyledIcon src={IconPlus} />
          </StyledLink>
        </Link>
        <Link to="/costs">
          <StyledLink active={active === "costs"}>Costs</StyledLink>
        </Link>
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

const StyledSidebar = styled.div`
  height: 100%;
  width: 300px;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;

  padding: ${p => p.theme.paddingXL} 0;
  padding-left: ${p => p.theme.paddingXL};
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
