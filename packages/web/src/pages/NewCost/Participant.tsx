import React, { memo } from "react"
import { User, ShareInput } from "../../graphql/types"
import styled from "../../application/theme"

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
  const share = shares.find(s => s.userId === user.id)

  const toggleParticipant = (userId: string) => {
    if (share) {
      if (shares.length === 2) return
      const newCostShares = shares.filter(s => s.userId !== userId)
      setFormState({
        costShares: newCostShares,
      })
    } else {
      const newCostShare = {
        userId,
        amount: 0,
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
    <div
      style={{
        opacity: share ? 1 : 0.4,
      }}
    >
      <StyledAvatar onClick={() => toggleParticipant(user.id)}>
        {user.firstName.split("")[0]}
      </StyledAvatar>
      <input
        type="number"
        disabled={!!!share}
        onChange={e => handleCostShareUpdate(user.id, +e.target.value)}
        value={share ? share.amount : 0}
      />
      {share && (
        <React.Fragment>
          <input
            type="radio"
            id={user.id}
            value={user.id}
            checked={isPayer}
            name="payerId"
            onChange={e => setFormState({ payerId: e.target.value })}
          />
          <label htmlFor={user.id}>{user.firstName}</label>
        </React.Fragment>
      )}
    </div>
  )
}

export default memo(Participant)

const StyledAvatar = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 40px;
  color: white;

  ${p => p.theme.flexCenter};
  background-color: ${p => p.theme.colorSecondary};
`
