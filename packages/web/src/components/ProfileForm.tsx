import React, { memo, useState } from "react"
import { navigate } from "@reach/router"

import styled from "../application/theme"

import { Me } from "../lib/graphql/types"
import useFormState from "../lib/hooks/useFormState"
import { useUpdateUser } from "../lib/graphql/user/hooks"

import Input from "./Input"
import Button from "./Button"

import ProfileAvatarUpload from "./ProfileAvatarUpload"

type ProfileFormProps = {
  user: Me.Me
}

type UpdateUserValues = {
  email: string
  firstName: string
  lastName: string
  password: string
}

function ProfileForm({ user }: ProfileFormProps) {
  const { formState, setFormState } = useFormState<UpdateUserValues>({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    password: "",
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const updateUser = useUpdateUser()

  const handleUpdateUser = (e: any) => {
    e.preventDefault()
    const data: { [key: string]: string } = {}
    if (formState.email) data.email = formState.email
    if (formState.firstName) data.firstName = formState.firstName
    if (formState.lastName) data.lastName = formState.lastName
    if (formState.password) data.password = formState.password

    setLoading(true)
    updateUser({ variables: { data } })
      .then(() => {
        navigate("/")
      })
      .catch(updateError => {
        setError(updateError.message.split(":")[1])
      })
  }

  return (
    <StyledProfileForm onSubmit={handleUpdateUser}>
      <ProfileAvatarUpload user={user} />
      <Input
        value={formState.email}
        onChange={e => setFormState({ email: e.target.value })}
        placeholder="jim@noquarter.co"
        required={true}
        label="Email"
      />
      <br />
      <Input
        value={formState.firstName}
        onChange={e => setFormState({ firstName: e.target.value })}
        placeholder="jim"
        required={true}
        label="First name"
      />
      <br />
      <Input
        value={formState.lastName}
        onChange={e => setFormState({ lastName: e.target.value })}
        placeholder="sebe"
        required={true}
        label="Last name"
      />
      <br />
      <Input
        type="password"
        value={formState.password}
        onChange={e => setFormState({ password: e.target.value })}
        placeholder="********"
        label="New password"
      />
      <br />
      <Button loading={loading} color="pink" variant="primary">
        Submit
      </Button>
      {error && <StyledError>{error}</StyledError>}
    </StyledProfileForm>
  )
}

export default memo(ProfileForm)

const StyledProfileForm = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
  background-color: white;
  flex-direction: column;
  padding: 0 ${p => p.theme.paddingXL};
  padding-bottom: ${p => p.theme.paddingXL};
  border-radius: ${p => p.theme.borderRadius};
  ${p => p.theme.flexCenter};
`

const StyledError = styled.div`
  opacity: 0.4;
  width: 100%;
  text-align: right;
  padding: ${p => p.theme.paddingM};
  font-size: ${p => p.theme.textS};
`
