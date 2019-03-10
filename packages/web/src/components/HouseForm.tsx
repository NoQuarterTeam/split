import React, { memo, useState } from "react"

import styled from "../application/theme"

import { GetHouse } from "../lib/graphql/types"
import { useCreateHouse } from "../lib/graphql/house/hooks"

import Input from "./Input"
import Button from "./Button"

type HouseFormProps = {
  house?: GetHouse.House
}

function HouseForm({ house }: HouseFormProps) {
  const [name, setName] = useState<string>(house ? house.name : "")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const createHouse = useCreateHouse()

  const handleCreateHouseSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
    createHouse({
      variables: { data: { name } },
    }).catch(() => {
      setLoading(false)
      setError("error creating house")
    })
  }

  return (
    <StyledForm onSubmit={handleCreateHouseSubmit}>
      <StyledHeader>Start by creating a house</StyledHeader>
      <Input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="The boys gaff"
        required={true}
        label="House name"
      />
      <br />
      <Button loading={loading} variant="primary" color="blue">
        Submit
      </Button>
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
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: ${p => p.theme.paddingM};
`

const StyledHeader = styled.h1`
  margin-bottom: ${p => p.theme.paddingXL};
`

const StyledError = styled.div`
  opacity: 0.4;
  width: 100%;
  text-align: right;
  padding: ${p => p.theme.paddingM};
  font-size: ${p => p.theme.textS};
`
