import React, { memo } from "react"
import { User, ShareInput } from "../../graphql/types"
import styled from "../../application/theme"
import Input from "../../components/Input"
import Radio from "../../components/Radio"

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
    <StyledParticipant
      style={{
        opacity: userShare ? 1 : 0.4,
      }}
    >
      <Column>
        <StyledAvatar onClick={() => toggleParticipant(user.id)}>
          {user.firstName.split("")[0]}
          {user.lastName.split("")[0]}
        </StyledAvatar>
      </Column>
      <Column>
        <Input
          type="number"
          prefix="€"
          placeholder="0.00"
          disabled={!!!userShare}
          onChange={e => handleCostShareUpdate(user.id, +e.target.value)}
          value={!userShare || userShare.amount === 0 ? "" : userShare.amount}
          style={{ border: 0 }}
        />
      </Column>
      <Column>
        {userShare && (
          <Radio
            id={user.id}
            value={user.id}
            checked={isPayer}
            name="payerId"
            onChange={e => setFormState({ payerId: e.target.value })}
          />
        )}
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

const Column = styled.div`
  width: 33%;
`
const StyledAvatar = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  color: white;
  cursor: pointer;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.1);

  ${p => p.theme.flexCenter};
  background-color: ${p => p.theme.colorSecondary};
`
