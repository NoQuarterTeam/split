import React, { memo, useContext } from "react"
import { RouteComponentProps } from "@reach/router"
import { useQuery } from "react-apollo-hooks"

import styled from "../../application/theme"
import { AppContext } from "../../application/context"

import Page from "../../components/Page"
import { GetHouse } from "../../graphql/types"
import { GET_HOUSE } from "../../graphql/house/queries"
import HouseBalance from "../../components/HouseBalance"
import Sidebar from "../../components/Sidebar"

function Dashboard(_: RouteComponentProps) {
  const { user } = useContext(AppContext)

  const { data, error } = useQuery<GetHouse.Query>(GET_HOUSE)
  return (
    <Page>
      <Sidebar />
      <HouseBalance users={data!.house.users} />
    </Page>
  )
}

export default memo(Dashboard)

const StyledHeader = styled.h2`
  margin: ${p => p.theme.paddingXL} auto;
`
