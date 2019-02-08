import React, { memo, useState } from "react"
import { useMutation } from "react-apollo-hooks"

import styled from "../application/theme"

import { Me, UpdateInput, UpdateUser } from "../graphql/types"
import { UPDATE_USER } from "../graphql/user/queries"
import useFormState from "../hooks/useFormState"

import Input from "./Input"
import Avatar from "./Avatar"
import Button from "./Button"

type ProfileFormProps = {
  user: Me.Me
}

function ProfileForm({ user }: ProfileFormProps) {
  const { formState, setFormState } = useFormState<UpdateInput>({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    password: "",
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const updateUser = useMutation<UpdateUser.Mutation, UpdateUser.Variables>(
    UPDATE_USER,
  )

  const handleUpdateUser = (e: any) => {
    e.preventDefault()
    let data: { [key: string]: string } = {}
    if (formState.email) data.email = formState.email
    if (formState.firstName) data.firstName = formState.firstName
    if (formState.lastName) data.lastName = formState.lastName
    if (formState.password) data.password = formState.password

    setLoading(true)
    updateUser({ variables: { data } })
      .then(() => {
        setLoading(false)
      })
      .catch(updateError => {
        setError(updateError.message.split(":")[1])
      })
  }

  return (
    <StyledProfileForm onSubmit={handleUpdateUser}>
      <StyledFormAvatar>
        <Avatar user={user!} />
      </StyledFormAvatar>
      <Input
        value={formState.email!}
        onChange={e => setFormState({ email: e.target.value })}
        placeholder="jim@noquarter.co"
        required={true}
        label="Email"
      />
      <br />
      <Input
        value={formState.firstName!}
        onChange={e => setFormState({ firstName: e.target.value })}
        placeholder="jim"
        required={true}
        label="First name"
      />
      <br />
      <Input
        value={formState.lastName!}
        onChange={e => setFormState({ lastName: e.target.value })}
        placeholder="sebe"
        required={true}
        label="Last name"
      />
      <br />
      <Input
        value={formState.password!}
        type="password"
        onChange={e => setFormState({ password: e.target.value })}
        placeholder="********"
        label="New password"
      />
      <br />
      <Button loading={loading} variant="secondary">
        Submit
      </Button>
      {error && <StyledError>{error}</StyledError>}
    </StyledProfileForm>
  )
}

export default memo(ProfileForm)

const StyledProfileForm = styled.form`
  margin: 0 auto;
  width: 40%;
  max-width: 500px;
  flex-direction: column;
  ${p => p.theme.flexCenter};
`

const StyledFormAvatar = styled.div`
  padding-bottom: ${p => p.theme.paddingXL};
`

const StyledError = styled.div`
  opacity: 0.4;
  width: 100%;
  text-align: right;
  padding: ${p => p.theme.paddingM};
  font-size: ${p => p.theme.textS};
`
