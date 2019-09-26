import React, { memo } from "react"
import { styled, Switch, Radio } from "@noquarter/ui"
import { decimalCount } from "@noquarter/utils"

import { media } from "../application/theme"

import Avatar from "./Avatar"
import Column from "./styled/Column"
import Center from "./styled/Center"
import { UserFragment, ShareInput } from "../lib/graphql/types"
import { getCurrency } from "../lib/helpers"
import useAppContext from "../lib/hooks/useAppState"
import { Input } from "./Input"

interface ParticipantProps {
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
  const { group } = useAppContext()
  const userShare = shares.find(s => s.userId === user.id)

  const toggleParticipant = (userId: string) => {
    if (userShare) {
      if (shares.length === 1) return
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

  const handleCostShareUpdate = (val: string) => {
    const amount = +val
    if (amount < 0) return
    if (decimalCount(amount) > 2) return
    setFormState({
      equalSplit: false,
      costShares: shares.map(s => {
        if (s.userId !== user.id) return s
        return {
          userId: user.id,
          amount,
        }
      }),
    })
  }

  return (
    <StyledParticipant>
      <Column flex={4}>
        <Center>
          <Switch
            on={!!userShare}
            onChange={() => toggleParticipant(user.id)}
          />
          <StyledAvatarWrapper
            data-testid="participant-avatar"
            onClick={() => toggleParticipant(user.id)}
            on={!!userShare}
          >
            <Avatar user={user} />
          </StyledAvatarWrapper>
        </Center>
      </Column>
      <Column flex={3}>
        <Input
          data-testid="participant-amount"
          type="number"
          prefix={getCurrency(group && group.currency)}
          required={true}
          placeholder="0.00"
          min="0"
          step="0.01"
          disabled={!!!userShare}
          onChange={handleCostShareUpdate}
          value={!userShare || userShare.amount === 0 ? "" : userShare.amount}
          style={{
            borderColor: "transparent",
            backgroundColor: "transparent",
            opacity: userShare ? 1 : 0.4,
          }}
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

const StyledAvatarWrapper = styled.div<{ on: boolean }>`
  cursor: pointer;
  padding-left: ${p => p.theme.paddingM};
  opacity: ${p => (p.on ? 1 : 0.4)};
`
