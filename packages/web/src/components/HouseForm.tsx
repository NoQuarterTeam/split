import React, { memo, useState } from "react"

import { styled, Button, Input, Select } from "@noquarter/ui"
import { useCreateHouse } from "../lib/graphql/house/hooks"
import currencies from "../lib/data/currencies"
import Tile from "./styled/Tile"

function HouseForm() {
  const [name, setName] = useState<string>("")
  const [currency, setCurrency] = useState<string>("Euro")

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const [createHouse] = useCreateHouse()

  const handleCreateHouse = (e: any) => {
    e.preventDefault()
    setLoading(true)
    createHouse({
      variables: { data: { name, currency } },
    }).catch(() => {
      setLoading(false)
      setError("error creating house")
    })
  }
  const currencyOptions = Object.entries(currencies).map(([name, symbol]) => ({
    value: name,
    label: `${symbol} - ${name}`,
  }))

  return (
    <StyledWrapper>
      <StyledForm as="form" onSubmit={handleCreateHouse}>
        <StyledHeader>Start by creating a house</StyledHeader>
        <br />

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

        <Button loading={loading}>Create house</Button>
        {error && <StyledError>{error}</StyledError>}
      </StyledForm>
    </StyledWrapper>
  )
}

export default memo(HouseForm)

const StyledWrapper = styled.div`
  height: 100%;
  ${p => p.theme.flexCenter};
`

const StyledForm = styled(Tile)`
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: ${p => p.theme.paddingL};
`

const StyledHeader = styled.h1``

const StyledError = styled.div`
  opacity: 0.4;
  width: 100%;
  text-align: right;
  padding: ${p => p.theme.paddingM};
  font-size: ${p => p.theme.textS};
`
