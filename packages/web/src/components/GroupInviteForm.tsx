import React, { memo, useState, useRef } from "react"
import { sleep } from "@noquarter/utils"
import { styled, Button, Input } from "@noquarter/ui"

import Alert from "./Alert"
import { useCreateInvite } from "../lib/graphql/invite/hooks"

interface GroupInviteFormProps {
  group: { id: string }
}

function GroupInviteForm({ group }: GroupInviteFormProps) {
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

  const [createInvite] = useCreateInvite()

  const handleInviteSend = (e: any) => {
    e.preventDefault()
    if (!email) return

    createInvite({ variables: { data: { groupId: group.id, email } } })
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
        onChange={setEmail}
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
    <Button variant="text" onClick={handleOpenForm}>
      Invite another group member
    </Button>
  )
}

export default memo(GroupInviteForm)

const StyledInviteForm = styled.form`
  width: 100%;
  margin: 0;
  transition: 200ms all;
  flex-direction: column;
  ${p => p.theme.flexAround};
`
