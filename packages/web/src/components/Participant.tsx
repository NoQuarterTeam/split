import React, { memo } from "react"
import { ShareInput, UserFragment } from "../lib/graphql/types"
import styled, { media } from "../application/theme"
import { decimalCount } from "../lib/helpers"

import Input from "./Input"
import Radio from "./Radio"
import Avatar from "./Avatar"
import Column from "./styled/Column"

type ParticipantProps = {
  user: UserFragment
  isPayer: boolean
  shares: ShareInput[]
  setFormState: (val: { [key: string]: any }) => void
}

function Participant({
  user,
  isPayer,
  shares,
  setFormState,
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

  const handleCostShareUpdate = (e: any) => {
    if (+e.target.value < 0) return
    if (decimalCount(+e.target.value) > 2) return
    setFormState({
      equalSplit: false,
      costShares: shares.map(s => {
        if (s.userId !== user.id) return s
        return {
          userId: user.id,
          amount: +e.target.value,
        }
      }),
    })
  }

  return (
    <StyledParticipant>
      <Column flex={3}>
        <div style={{ opacity: userShare ? 1 : 0.4 }}>
          <Avatar user={user} onClick={() => toggleParticipant(user.id)} />
        </div>
      </Column>
      <Column flex={3}>
        <Input
          type="number"
          prefix="€"
          required={true}
          placeholder="0.00"
          min="0"
          step="0.01"
          disabled={!!!userShare}
          onChange={handleCostShareUpdate}
          value={!userShare || userShare.amount === 0 ? "" : userShare.amount}
          style={{ border: 0, opacity: userShare ? 1 : 0.4 }}
        />
      </Column>
      <Column flex={1}>
        <div>
          <Radio
            id={user.id}
            value={user.id}
            checked={isPayer}
            name="payerId"
            onChange={e => setFormState({ payerId: e.target.value })}
          />
        </div>
      </Column>
    </StyledParticipant>
  )
}

export default memo(Participant)

const StyledParticipant = styled.div`
  width: 100%;

  margin-bottom: ${p => p.theme.paddingL};
  ${p => p.theme.flexBetween};

  ${p => media.greaterThan("sm")`
    margin-bottom: ${p.theme.paddingXL};
  `}
`
