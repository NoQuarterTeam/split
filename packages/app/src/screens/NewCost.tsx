import React from "react"
import { View, Text } from "react-native"
import Button from "../components/Button"
import useAppContext from "../lib/hooks/useAppContext"

function NewCost() {
  const { setRoute } = useAppContext()
  return (
    <View>
      <Text>New Cost screen</Text>
      <Button text="back" onPress={() => setRoute("BALANCE")} />
    </View>
  )
}

export default NewCost
