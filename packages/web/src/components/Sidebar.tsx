import React, { memo } from "react"
import { Link } from "@reach/router"
import IconPlus from "../assets/images/icon-plus.svg"

import styled from "../application/theme"
import { LOGOUT, ME } from "../graphql/user/queries"
import { useMutation } from "react-apollo-hooks"

function Sidebar() {
  const logout = useMutation(LOGOUT, {
    update: cache => {
      cache.writeQuery({ query: ME, data: { me: null } })
    },
  })
  return (
    <StyledSidebar>
      <Link to="/">
        <StyledLink active={true}>Dashboard</StyledLink>
      </Link>
      <Link to="/new-cost">
        <StyledLink>
          New cost <StyledIcon src={IconPlus} />
        </StyledLink>
      </Link>
      <Link to="/costs">
        <StyledLink>Costs</StyledLink>
      </Link>
      <Link to="/" onClick={() => logout()}>
        <StyledLink>Logout</StyledLink>
      </Link>
    </StyledSidebar>
  )
}

export default memo(Sidebar)

const StyledSidebar = styled.div`
  height: 100%;
  width: 200px;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;

  padding: 0 ${p => p.theme.paddingXL};
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
  vertical-align: middle;
  padding-left: ${p => p.theme.paddingM};
`
