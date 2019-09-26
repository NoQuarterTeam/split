import React, { memo, useState } from "react"

import { styled, Button, Input, Select } from "@noquarter/ui"
import { useCreateGroup } from "../lib/graphql/group/hooks"
import currencies from "../lib/data/currencies"
import Tile from "./styled/Tile"

function GroupForm() {
  const [name, setName] = useState<string>("")
  const [currency, setCurrency] = useState<string>("Euro")

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const [createGroup] = useCreateGroup()

  const handleCreateGroup = (e: any) => {
    e.preventDefault()
    setLoading(true)
    createGroup({
      variables: { data: { name, currency } },
    }).catch(() => {
      setLoading(false)
      setError("error creating group")
    })
  }
  const currencyOptions = Object.entries(currencies).map(([name, symbol]) => ({
    value: name,
    label: `${symbol} - ${name}`,
  }))

  return (
    <StyledWrapper>
      <StyledForm as="form" onSubmit={handleCreateGroup}>
        <StyledHeader>Start by creating a group</StyledHeader>
        <br />

        <Input
          label="Group name"
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

        <Button loading={loading}>Create group</Button>
        {error && <StyledError>{error}</StyledError>}
      </StyledForm>
    </StyledWrapper>
  )
}

export default memo(GroupForm)

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
