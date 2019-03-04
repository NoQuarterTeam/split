import React, { useState, memo } from "react"
import styled from "../application/theme"
import { GetHouse } from "../lib/graphql/types"
import { useEditHouseMutation } from "../lib/graphql/house/hooks"

type HouseNameProps = {
  house: GetHouse.House
}

function HouseName({ house }: HouseNameProps) {
  const [houseName, setHouseName] = useState<string>(house.name)
  const updateHouse = useEditHouseMutation()

  const handleHouseUpdate = (e: any) => {
    e.preventDefault()
    if (!houseName) return setHouseName(name)
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
          __typename: "House",
        },
      },
    })
  }
  return (
    <form onSubmit={handleHouseUpdate}>
      <StyledInput
        value={houseName}
        onBlur={handleHouseUpdate}
        onChange={e => setHouseName(e.target.value)}
      />
    </form>
  )
}

export default memo(HouseName)

const StyledInput = styled.input`
  outline: 0;
  width: 100%;
  border: 0;
  padding: 0;
  border: 2px solid transparent;
  background-color: transparent;
  color: ${p => p.theme.colorHeader};
  border-radius: ${p => p.theme.borderRadius};
  font-size: ${p => p.theme.textL};
  font-weight: ${p => p.theme.fontBlack};
`
