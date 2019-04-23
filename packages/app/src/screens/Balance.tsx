import React, { FC } from "react"
import { Text, Button } from "react-native"
import { useLogout } from "@split/connector"

import styled from "../application/theme"
import useAppContext from "../lib/hooks/useAppContext"
import { round } from "../lib/helpers"

import Page from "../components/Page"
import HouseName from "../components/HouseName"

const Balance: FC = () => {
  const { user, house } = useAppContext()
  if (!house) return <Text>Create House Form</Text>

  const logout = useLogout()
  const handleLogout = () => {
    logout()
  }

  const getBalanceHeader = () => {
    if (user.balance > 0) {
      return `You are owed €${round(user.balance * 0.01)}`
    } else {
      return `You owe €${Math.abs(round(user.balance * 0.01))}`
    }
  }
  return (
    <Page>
      {house.invites.length === 0 && house.users.length === 1 ? (
        <Text>Invite Form</Text>
      ) : (
        <StyledWrapper>
          <StyledHeader>
            <HouseName house={house} />
            <HouseSummary>{getBalanceHeader()}</HouseSummary>
          </StyledHeader>
          <Text>House balance</Text>
          <StyledInviteWrapper>
            <Text>House invite</Text>
          </StyledInviteWrapper>
          <Button onPress={handleLogout} title="logout" />
        </StyledWrapper>
      )}
    </Page>
  )
}

export default Balance

const StyledWrapper = styled.View`
  padding: ${p => p.theme.paddingL};
`

const StyledHeader = styled.View`
  width: 100%;
  display: flex;
  padding: ${p => p.theme.paddingS};
  padding-left: 60px;
`

const HouseSummary = styled.Text`
  padding-left: ${p => p.theme.paddingS};
  font-size: ${p => p.theme.textM};
  color: ${p => p.theme.colorLabel};
`

const StyledInviteWrapper = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: ${p => p.theme.paddingL};
  ${p => p.theme.flexBetween};
`
