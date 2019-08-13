import React, { memo, useState } from "react"
import { navigate } from "@reach/router"

import { styled, Button, Input } from "@noquarter/ui"

import useFormState from "../lib/hooks/useFormState"

import ProfileAvatarUpload from "./ProfileAvatarUpload"
import { UserFragment } from "../lib/graphql/types"
import { useUpdateUser } from "../lib/graphql/user/hooks"

interface ProfileFormProps {
  user: UserFragment
}

interface UpdateUserValues {
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
  const [updateUser] = useUpdateUser()

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
        onChange={email => setFormState({ email })}
        placeholder="jim@noquarter.co"
        required={true}
        label="Email"
      />
      <Input
        value={formState.firstName}
        onChange={firstName => setFormState({ firstName })}
        placeholder="jim"
        required={true}
        label="First name"
      />
      <Input
        value={formState.lastName}
        onChange={lastName => setFormState({ lastName })}
        placeholder="sebe"
        required={true}
        label="Last name"
      />
      <Input
        type="password"
        value={formState.password}
        onChange={password => setFormState({ password })}
        placeholder="********"
        label="New password"
      />
      <Button loading={loading}>Submit</Button>
      {error && <StyledError>{error}</StyledError>}
    </StyledProfileForm>
  )
}

export default memo(ProfileForm)

const StyledProfileForm = styled.form`
  width: 100%;
  max-width: 450px;
  flex-direction: column;
  border-radius: ${p => p.theme.borderRadius};
  padding: 0 ${p => p.theme.paddingL};
  ${p => p.theme.flexCenter};
`

const StyledError = styled.div`
  opacity: 0.4;
  width: 100%;
  text-align: right;
  padding: ${p => p.theme.paddingM};
  font-size: ${p => p.theme.textS};
`
