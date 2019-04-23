import React, { FC, useState } from "react"
import { Text } from "react-native"
import styled from "../application/theme"

import BottomBar from "./BottomBar"

const Page: FC = ({ children }) => {
  const [sideBarOpen, setSidebarOpen] = useState<boolean>(false)
  return (
    <StyledPage>
      <StyledPageContent>{children}</StyledPageContent>
      <StyledMenu onPress={() => setSidebarOpen(true)}>
        <Text>Menu</Text>
      </StyledMenu>
      <BottomBar />
    </StyledPage>
  )
}

export default Page

const StyledPage = styled.View`
  padding-left: 0;
  display: flex;
  width: 100%;
  height: 100%;
`

const StyledMenu = styled.TouchableOpacity`
  display: block;
  position: absolute;
  display: flex;
  top: 20px;
  left: 20px;
  border: 0;
  background-color: ${p => p.theme.colorPage};
  padding: ${p => p.theme.paddingM};
  border-radius: ${p => p.theme.borderRadius};
`

const StyledPageContent = styled.View`
  width: 100%;
  min-height: 100%;
  background-color: ${p => p.theme.colorBackground};
`
