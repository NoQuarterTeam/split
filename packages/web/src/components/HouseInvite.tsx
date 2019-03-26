import React, { memo, useState, useRef } from "react"
import { useCreateInvite, HouseFragment } from "@split/connector"

import styled from "../application/theme"
import { sleep } from "../lib/helpers"

import IconPlusAlt from "../assets/images/icon-plus-alt.svg"

import Input from "./Input"
import Button from "./Button"

interface HouseInviteProps {
  house: HouseFragment
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

  const createInvite = useCreateInvite()

  const handleInviteSend = (e: any) => {
    e.preventDefault()
    if (!email) return

    createInvite({ variables: { data: { houseId: house.id, email } } })
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
              color="pink"
              variant="secondary"
              onClick={() => setFormOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </StyledInviteForm>
      ) : (
        <Button color="pink" variant="tertiary" onClick={handleOpenForm}>
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
