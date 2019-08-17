import React, { FC, useState } from "react"
import { styled, Input, Select, Button } from "@noquarter/ui"
import { HouseFragment } from "../lib/graphql/types"
import { useEditHouse } from "../lib/graphql/house/hooks"
import currencies from "../lib/data/currencies"

interface Props {
  house: HouseFragment
}
const HouseSettings: FC<Props> = ({ house }) => {
  const [name, setName] = useState<string>(house.name)
  const [currency, setCurrency] = useState<string>(house.currency || "Euro")

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const [updateHouse] = useEditHouse()

  const handleHouseUpdate = (e: any) => {
    e.preventDefault()
    if (!name) return setName(house.name)
    setLoading(true)
    updateHouse({
      variables: {
        houseId: house.id,
        data: {
          currency: currency,
          name: name,
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        editHouse: {
          ...house,
          currency,
          name,
        },
      },
    })
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false)
        setError("Error updating house")
      })
  }
  const currencyOptions = Object.entries(currencies).map(([name, symbol]) => ({
    value: name,
    label: `${symbol} - ${name}`,
  }))
  return (
    <StyledWrapper>
      <StyledHeader>House</StyledHeader>
      <form onSubmit={handleHouseUpdate} style={{ width: "100%" }}>
        <Input
          label="House name"
          value={name}
          onChange={setName}
          placeholder="201 Columbusplein"
          required={true}
        />
        <br />
        <Select
          label="Currency"
          value={currency}
          onChange={setCurrency}
          options={currencyOptions}
          required={true}
        />
        <br />

        <Button loading={loading}>Update house</Button>
        {error && <StyledError>{error}</StyledError>}
      </form>
    </StyledWrapper>
  )
}

export default HouseSettings

const StyledWrapper = styled.div`
  width: 100%;
  ${p => p.theme.flexCenter};
  flex-direction: column;
`

const StyledHeader = styled.h3`
  color: ${p => p.theme.colorText};
  font-size: ${p => p.theme.textL};
  font-weight: ${p => p.theme.fontNormal};
  margin-bottom: ${p => p.theme.paddingM};
`

const StyledError = styled.div`
  opacity: 0.4;
  width: 100%;
  text-align: right;
  padding: ${p => p.theme.paddingM};
  font-size: ${p => p.theme.textS};
`
