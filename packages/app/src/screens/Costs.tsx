import React, { FC, useState } from "react"
import { Text, View } from "react-native"
import { useAllCosts } from "@split/connector"

// import styled from "../../application/theme"
import useAppContext from "../lib/hooks/useAppContext"

import Page from "../components/Page"

const Costs: FC = () => {
  const { house } = useAppContext()
  if (!house) return null
  const [search] = useState<string>("")
  const { costs } = useAllCosts(house.id, search)
  return (
    <Page>
      {costs &&
        costs.map(cost => {
          return (
            <View key={cost.id}>
              <Text>{cost.name}</Text>
            </View>
          )
        })}
    </Page>
  )
}

export default Costs
