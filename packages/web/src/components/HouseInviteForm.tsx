import React, { memo, useState, useRef } from "react"
import { useCreateInvite } from "@split/connector"
import { sleep } from "@noquarter/utils"
import { styled, Button, Input } from "@noquarter/ui"

import Alert from "./Alert"

interface HouseInviteFormProps {
  house: { id: string }
}

function HouseInviteForm({ house }: HouseInviteFormProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [formOpen, setFormOpen] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")
  const [error, setError] = useState<string>("")
  const handleOpenForm = async () => {
    setFormOpen(true)
    await sleep(0)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const createInvite = useCreateInvite()

  const handleInviteSend = (e: any) => {
    e.preventDefault()
    if (!email) return

    createInvite({ variables: { data: { houseId: house.id, email } } })
      .then(() => {
        setEmail("")
        setError("")
        setFormOpen(false)
      })
      .catch(err => {
        setError(err.message.split(":")[1])
      })
  }

  return formOpen ? (
    <StyledInviteForm onSubmit={handleInviteSend}>
      {error && <Alert text={error} />}
      <Input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="jimsebe@gmail.com"
        ref={inputRef}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button>Send invite</Button>
        <Button type="button" variant="text" onClick={() => setFormOpen(false)}>
          Cancel
        </Button>
      </div>
    </StyledInviteForm>
  ) : (
    <Button variant="text" full={true} onClick={handleOpenForm}>
      Invite another house mate
    </Button>
  )
}

export default memo(HouseInviteForm)

const StyledInviteForm = styled.form`
  width: 100%;
  margin: 0;
  transition: 200ms all;
  flex-direction: column;
  ${p => p.theme.flexAround};
`