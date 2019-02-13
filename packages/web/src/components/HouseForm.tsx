import React, { memo, useState } from "react"
import { useMutation } from "react-apollo-hooks"

import styled from "../application/theme"

import { CreateHouse, GetHouse } from "../graphql/types"
import { ME } from "../graphql/user/queries"

import Input from "./Input"
import Button from "./Button"
import { CREATE_HOUSE, GET_HOUSE } from "../graphql/house/queries"

type HouseFormProps = {
  house?: GetHouse.House
}

function HouseForm({ house }: HouseFormProps) {
  const [name, setName] = useState<string>(house ? house.name : "")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const createHouse = useMutation<CreateHouse.Mutation, CreateHouse.Variables>(
    CREATE_HOUSE,
    {
      refetchQueries: [{ query: ME }],
      awaitRefetchQueries: true,
    },
  )

  const handleCreateHouseSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
    createHouse({
      variables: { data: { name } },
      update: (cache, { data }) => {
        if (data) {
          cache.writeQuery({
            query: GET_HOUSE,
            data: { house: data.createHouse },
          })
        }
      },
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
      <Button loading={loading} variant="secondary">
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
  padding: ${p => p.theme.paddingM};
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
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
