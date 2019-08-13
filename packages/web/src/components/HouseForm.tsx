import React, { memo, useState } from "react"

import { styled, Button, Input } from "@noquarter/ui"
import { useCreateHouse } from "../lib/graphql/house/hooks"

function HouseForm() {
  const [name, setName] = useState<string>("")
  const [currency] = useState<string>("Euro")

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

  return (
    <StyledForm onSubmit={handleCreateHouse}>
      <StyledHeader>Start by creating a house</StyledHeader>
      <br />

      <Input
        value={name}
        onChange={setName}
        placeholder="House name"
        required={true}
      />
      <br />
      <Button loading={loading}>Create house</Button>
      {error && <StyledError>{error}</StyledError>}
    </StyledForm>
  )
}

export default memo(HouseForm)

const StyledForm = styled.form`
  height: 100%;
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: ${p => p.theme.paddingM};
`

const StyledHeader = styled.h1``

const StyledError = styled.div`
  opacity: 0.4;
  width: 100%;
  text-align: right;
  padding: ${p => p.theme.paddingM};
  font-size: ${p => p.theme.textS};
`
