import React, { memo, useState, useRef } from "react"
import { useMutation } from "react-apollo-hooks"
import styled from "../application/theme"
import Input from "./Input"
import Button from "./Button"
import { sleep } from "../lib/helpers"
import { GetHouse, InviteUser } from "../lib/graphql/types"
import { INVITE_USER } from "../lib/graphql/user/queries"

type HouseInviteProps = {
  house: GetHouse.House
}

function HouseInvite({ house }: HouseInviteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [formOpen, setFormOpen] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")

  const handleOpenForm = async () => {
    setFormOpen(true)
    await sleep(0)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const inviteUser = useMutation<InviteUser.Mutation, InviteUser.Variables>(
    INVITE_USER,
  )

  const handleInviteSend = (e: any) => {
    e.preventDefault()
    if (!email) return

    inviteUser({ variables: { data: { houseId: house.id, email } } })
      .then(() => {
        setEmail("")
        setFormOpen(false)
      })
      .catch(() => {
        // TODO: handle error
      })
  }

  return (
    <StyledInviteWrapper>
      {formOpen ? (
        <StyledInviteForm onSubmit={handleInviteSend}>
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
            <Button variant="primary">Send invite</Button>
            <Button
              type="button"
              variant="highlight"
              onClick={() => setFormOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </StyledInviteForm>
      ) : (
        <Button variant="highlight" onClick={handleOpenForm}>
          Invite house mate
        </Button>
      )}
    </StyledInviteWrapper>
  )
}

export default memo(HouseInvite)

const StyledInviteWrapper = styled.div`
  position: relative;
`

const StyledInviteForm = styled.form`
  width: max-content;
  margin: 0;
  transition: 200ms all;
  flex-direction: column;
  ${p => p.theme.flexAround};
`
