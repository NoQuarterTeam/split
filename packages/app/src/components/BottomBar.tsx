import React from "react"
import styled from "../application/theme"
import { Text, Image, TouchableOpacity } from "react-native"
import useAppContext from "../lib/hooks/useAppContext"

function BottomBar() {
  const { setRoute } = useAppContext()
  return (
    <StyledBottomBar>
      <StyledTab>
        <TouchableOpacity onPress={() => setRoute("BALANCE")}>
          <Text>Balance</Text>
        </TouchableOpacity>
      </StyledTab>
      <StyledTab>
        <TouchableOpacity onPress={() => setRoute("NEW_COST")}>
          <Image
            source={require("../assets/images/icon-plus.png")}
            width={30}
          />
        </TouchableOpacity>
      </StyledTab>
      <StyledTab>
        <TouchableOpacity onPress={() => setRoute("COSTS")}>
          <Text>Costs</Text>
        </TouchableOpacity>
      </StyledTab>
    </StyledBottomBar>
  )
}

const StyledBottomBar = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  flex-direction: row;
  ${p => p.theme.flexAround};
`

const StyledTab = styled.View`
  flex: 1;
  ${p => p.theme.flexCenter};
`

export default BottomBar
