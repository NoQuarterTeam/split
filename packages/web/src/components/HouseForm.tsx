import React, { memo, useState } from "react"
import { useMutation } from "react-apollo-hooks"

import styled from "../application/theme"

import { Me, UpdateUser } from "../graphql/types"
import { UPDATE_USER } from "../graphql/user/queries"

import Input from "./Input"
import Button from "./Button"

type HouseFormProps = {
  user: Me.Me
}

function HouseForm({ user }: HouseFormProps) {
  const [name, setName] = useState<string>(user.house!.name)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const updateUser = useMutation<UpdateUser.Mutation, UpdateUser.Variables>(
    UPDATE_USER,
  )

  const handleUpdateUser = (e: any) => {
    e.preventDefault()
    setLoading(true)
    //   updateUser({ variables: { data } })
    //     .then(() => {
    //       setLoading(false)
    //     })
    //     .catch(updateError => {
    //       setError(updateError.message.split(":")[1])
    //     })
  }

  return (
    <StyledHouseForm onSubmit={handleUpdateUser}>
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
    </StyledHouseForm>
  )
}

export default memo(HouseForm)

const StyledHouseForm = styled.form`
  margin: 0 auto;
  width: 40%;
  max-width: 500px;
`

const StyledError = styled.div`
  opacity: 0.4;
  width: 100%;
  text-align: right;
  padding: ${p => p.theme.paddingM};
  font-size: ${p => p.theme.textS};
`
