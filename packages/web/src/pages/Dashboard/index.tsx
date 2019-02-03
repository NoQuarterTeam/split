import React, { memo, useContext } from "react"
import { RouteComponentProps, Link } from "@reach/router"
import { useMutation, useQuery } from "react-apollo-hooks"

import styled from "../../application/theme"
import { AppContext } from "../../application/context"

import { LOGOUT, ME } from "../../graphql/user/queries"

import Page from "../../components/Page"
import Button from "../../components/Button"
import { GetHouse } from "../../graphql/types"
import { GET_HOUSE } from "../../graphql/house/queries"
import UserBalance from "../../components/UserBalance"

function Dashboard(_: RouteComponentProps) {
  const { user } = useContext(AppContext)
  const logout = useMutation(LOGOUT, {
    update: cache => {
      cache.writeQuery({ query: ME, data: { me: null } })
    },
  })
  const { data, error } = useQuery<GetHouse.Query>(GET_HOUSE)
  return (
    <Page>
      <div>
        <StyledHeader>
          Hello there, {user!.firstName} {user!.lastName}
        </StyledHeader>
        <Button onClick={() => logout()}>Logout</Button>
        <Link to="/new-cost">add new cost</Link>
        <UserBalance users={data!.house.users} />
      </div>
    </Page>
  )
}

export default memo(Dashboard)

const StyledHeader = styled.h2`
  margin: ${p => p.theme.paddingXL} auto;
`
