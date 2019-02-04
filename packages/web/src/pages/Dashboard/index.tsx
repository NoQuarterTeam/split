import React, { memo, useContext } from "react"
import { RouteComponentProps } from "@reach/router"
import { useQuery } from "react-apollo-hooks"

import styled from "../../application/theme"
import { AppContext } from "../../application/context"

import { GetHouse } from "../../graphql/types"
import { GET_HOUSE } from "../../graphql/house/queries"

import Sidebar from "../../components/Sidebar"
import Page from "../../components/Page"

import HouseBalance from "./HouseBalance"

function Dashboard(_: RouteComponentProps) {
  const { user } = useContext(AppContext)
  const { data, error } = useQuery<GetHouse.Query>(GET_HOUSE)

  const getBalanceHeader = () => {
    if (user.balance > 0) {
      return `You are owed €${user.balance * 0.01}`
    } else {
      return `You owe €${user.balance * 0.01}`
    }
  }
  return (
    <Page>
      <StyledHeader>{getBalanceHeader()}</StyledHeader>
      <Sidebar />
      <HouseBalance users={data!.house.users} />
    </Page>
  )
}

export default memo(Dashboard)

const StyledHeader = styled.h2`
  position: absolute;
  top: 100px;
  right: 100px;
`
