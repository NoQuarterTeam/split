import React, { memo, useState, useRef } from "react"
import { useCreateInvite, HouseFragment } from "@split/connector"

import { styled, Button, Input } from "@noquarter/ui"
import { sleep } from "@noquarter/utils"

import IconPlusAlt from "../assets/images/icon-plus-alt.svg"

import Alert from "./Alert"

interface HouseInviteProps {
  house: HouseFragment
}

function HouseInvite({ house }: HouseInviteProps) {
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

  return (
    <StyledInviteWrapper>
      {formOpen ? (
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
            <Button
              type="button"
              variant="outline"
              onClick={() => setFormOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </StyledInviteForm>
      ) : (
        <Button variant="text" onClick={handleOpenForm}>
          <StyledIcon src={IconPlusAlt} />
          Invite house mate
        </Button>
      )}
    </StyledInviteWrapper>
  )
}

export default memo(HouseInvite)

const StyledInviteWrapper = styled.div``

const StyledInviteForm = styled.form`
  width: max-content;
  margin: 0;
  transition: 200ms all;
  flex-direction: column;
  ${p => p.theme.flexAround};
`

const StyledIcon = styled.img`
  height: 22px;
  vertical-align: middle;
  margin-right: ${p => p.theme.paddingM};
`
