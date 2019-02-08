import React, { memo } from "react"
import { User, ShareInput } from "../graphql/types"
import styled from "../application/theme"
import { round } from "../lib/helpers"

import Input from "./Input"
import Radio from "./Radio"
import Avatar from "./Avatar"
import Column from "./Column"

type ParticipantProps = {
  user: User.Fragment
  isPayer: boolean
  shares: ShareInput[]
  setFormState: (val: { [key: string]: any }) => void
  setEqualSplit: (val: boolean) => void
}

function Participant({
  user,
  isPayer,
  shares,
  setFormState,
  setEqualSplit,
}: ParticipantProps) {
  const userShare = shares.find(s => s.userId === user.id)

  const toggleParticipant = (userId: string) => {
    if (userShare) {
      // Remove user from split if more than 3 house mates
      if (shares.length === 2) return
      const newCostShares = shares.filter(s => s.userId !== userId)
      setFormState({
        costShares: newCostShares,
      })
    } else {
      // Add user back to split
      const newCostShare = {
        userId,
        amount: "",
      }
      const newShares = [...shares, newCostShare]
      setFormState({
        costShares: newShares,
      })
    }
  }

  const handleCostShareUpdate = (userId: string, amount: number) => {
    if (amount < 0) return
    setEqualSplit(false)
    setFormState({
      costShares: shares.map(s => {
        if (s.userId !== userId) return s
        return {
          userId,
          amount,
        }
      }),
    })
  }

  return (
    <StyledParticipant>
      <Column flex={2}>
        <div style={{ opacity: userShare ? 1 : 0.4 }}>
          <Avatar user={user} onClick={() => toggleParticipant(user.id)} />
        </div>
      </Column>
      <Column flex={2}>
        <Input
          type="number"
          prefix="€"
          placeholder="0.00"
          disabled={!!!userShare}
          onChange={e => handleCostShareUpdate(user.id, +e.target.value)}
          value={
            !userShare || userShare.amount === 0
              ? ""
              : round(userShare.amount, 2)
          }
          style={{ border: 0, opacity: userShare ? 1 : 0.4 }}
        />
      </Column>
      <Column flex={1}>
        <Radio
          id={user.id}
          value={user.id}
          checked={isPayer}
          name="payerId"
          onChange={e => setFormState({ payerId: e.target.value })}
        />
      </Column>
    </StyledParticipant>
  )
}

export default memo(Participant)

const StyledParticipant = styled.div`
  width: 100%;

  margin-bottom: ${p => p.theme.paddingXL};
  ${p => p.theme.flexBetween};
`
