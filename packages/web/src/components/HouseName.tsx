import React, { useState, useRef } from "react"
import styled from "../application/theme"
import { useMutation } from "react-apollo-hooks"
import { EDIT_HOUSE, GET_HOUSE } from "../graphql/house/queries"
import { GetHouse, EditHouse } from "../graphql/types"

type HouseNameProps = {
  house: GetHouse.House
}

function HouseName({ house }: HouseNameProps) {
  const [houseName, setHouseName] = useState<string>(house.name)
  const inputRef = useRef<HTMLInputElement>(null)
  const updateHouse = useMutation<EditHouse.Mutation, EditHouse.Variables>(
    EDIT_HOUSE,
  )

  const handleHouseUpdate = (e: any) => {
    if (e.key === "Enter") {
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
        update: (cache, { data }) => {
          if (data) {
            const res = data.editHouse
            cache.writeQuery({ query: GET_HOUSE, data: { house: res } })
          }
        },
      })
      if (inputRef.current) {
        inputRef.current.blur()
      }
    }
  }
  return (
    <StyledInput
      ref={inputRef}
      value={houseName}
      onBlur={handleHouseUpdate}
      onKeyPress={handleHouseUpdate}
      onChange={e => setHouseName(e.target.value)}
    />
  )
}

export default HouseName

const StyledInput = styled.input`
  outline: 0;
  border: 0;
  border: 2px solid transparent;
  width: max-content;
  border-radius: ${p => p.theme.borderRadius};
  font-size: ${p => p.theme.textL};
  font-weight: ${p => p.theme.fontBlack};

  &:hover,
  &:focus {
    border: 2px solid ${p => p.theme.colorLightGrey};
  }
`
