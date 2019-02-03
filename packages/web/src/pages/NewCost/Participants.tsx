import React, { memo } from "react"
import Participant from "./Participant"
import Button from "../../components/Button"
import { User, CostInput } from "../../graphql/types"
import styled from "../../application/theme"

type ParticipantsProps = {
  users: User.Fragment[]
  equalSplit: boolean
  formState: CostInput
  setFormState: (val: { [key: string]: any }) => void
  setEqualSplit: (val: boolean) => void
  applyEqualSplit: () => void
}
function Participants({
  users,
  equalSplit,
  formState,
  setFormState,
  setEqualSplit,
  applyEqualSplit,
}: ParticipantsProps) {
  return (
    <StyledParticipants>
      {users.map(user => {
        return (
          <Participant
            key={user.id}
            setEqualSplit={setEqualSplit}
            isPayer={user.id === formState.payerId}
            user={user}
            shares={formState.costShares}
            setFormState={setFormState}
          />
        )
      })}
      {!equalSplit &&
        formState.amount !==
          formState.costShares.reduce((acc, s) => acc + s.amount, 0) && (
          <p>splits dont equal amount</p>
        )}

      {!equalSplit && (
        <Button onClick={applyEqualSplit}>set equal split</Button>
      )}
    </StyledParticipants>
  )
}

export default memo(Participants)

const StyledParticipants = styled.div`
  width: 40%;
`
