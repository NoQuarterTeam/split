import React, { useState, memo } from "react"
import { useEditHouse, HouseFragment } from "@split/connector"

import styled from "../application/theme"

interface HouseNameProps {
  house: HouseFragment
}

function HouseName({ house }: HouseNameProps) {
  const [houseName, setHouseName] = useState<string>(house.name)
  const updateHouse = useEditHouse()

  const handleHouseUpdate = (e: any) => {
    e.preventDefault()
    if (!houseName) return setHouseName(house.name)
    updateHouse({
      variables: {
        houseId: house.id,
        data: {
          name: houseName,
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        editHouse: {
          ...house,
          name: houseName,
        },
      },
    })
  }
  return (
    <StyledInput
      value={houseName}
      blurOnSubmit={true}
      onChangeText={text => setHouseName(text)}
      onSubmitEditing={handleHouseUpdate}
      returnKeyType="done"
    />
  )
}

export default memo(HouseName)

const StyledInput = styled.TextInput`
  width: 100%;
  border: 0;
  padding: 0;
  border: 2px solid transparent;
  background-color: transparent;
  color: ${p => p.theme.colorText};
  border-radius: ${p => p.theme.borderRadius};
  font-size: ${p => p.theme.textL};
  font-weight: ${p => p.theme.fontBlack};
`
