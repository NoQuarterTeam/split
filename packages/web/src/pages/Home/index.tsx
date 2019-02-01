import React, { memo, useContext } from "react"
import { RouteComponentProps } from "@reach/router"
import { useMutation } from "react-apollo-hooks"

import styled from "../../application/theme"
import { AppContext } from "../../application/context"

import { LOGOUT, ME } from "../../graphql/user/queries"

import Page from "../../components/Page"
import Button from "../../components/Button"

function Profile(_: RouteComponentProps) {
  const { user } = useContext(AppContext)
  const logout = useMutation(LOGOUT, {
    update: cache => {
      cache.writeQuery({ query: ME, data: { me: null } })
    },
  })
  return (
    <Page>
      <div>
        <StyledHeader>
          Hello there, {user!.firstName} {user!.lastName}
        </StyledHeader>
        <Button onClick={() => logout()}>Logout</Button>
      </div>
    </Page>
  )
}

export default memo(Profile)

const StyledHeader = styled.h2`
  margin: ${p => p.theme.paddingXL} auto;
`
