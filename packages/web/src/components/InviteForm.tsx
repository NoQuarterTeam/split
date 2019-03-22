import React, { memo, useState } from "react"
import { useCreateInvite, HouseFragment } from "@split/connector"

import styled from "../application/theme"

import Input from "./Input"
import Button from "./Button"

type InviteFormProps = {
  house: HouseFragment
}
function InviteForm({ house }: InviteFormProps) {
  const [email, setEmail] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const createInvite = useCreateInvite()

  const handleCreateInvite = (e: any) => {
    e.preventDefault()
    setLoading(true)
    createInvite({
      variables: { data: { email, houseId: house.id } },
    }).catch(() => {
      setLoading(false)
      setError("error sending invite")
    })
  }

  return (
    <StyledForm onSubmit={handleCreateInvite}>
      <StyledHeader>Now invite someone to join</StyledHeader>
      <Input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="jimsebe@gmail.com"
        required={true}
        label="House mate"
      />
      <br />
      <Button loading={loading} variant="primary" color="blue">
        Send invite
      </Button>
      {error && <StyledError>{error}</StyledError>}
    </StyledForm>
  )
}

export default memo(InviteForm)

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
