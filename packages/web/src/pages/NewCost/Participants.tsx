import React, { memo } from "react"
import Participant from "./Participant"
import Button from "../../components/Button"
import { User, CostInput } from "../../graphql/types"
import styled from "../../application/theme"
import Alert from "../../components/Alert"

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
  const difference =
    formState.amount !==
    formState.costShares.reduce((acc, s) => acc + s.amount, 0)
  return (
    <StyledParticipants>
      <StyledHeader>
        <Column>
          <StyledLabel>Participants</StyledLabel>
        </Column>
        <Column>
          <StyledLabel>
            {!equalSplit && difference && (
              <Alert text="Split must equal amount" />
            )}
            Split
          </StyledLabel>
        </Column>
        <Column>
          <StyledLabel>Payer</StyledLabel>
        </Column>
      </StyledHeader>
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

      {!equalSplit && (
        <StyledButton onClick={applyEqualSplit}>Split equally</StyledButton>
      )}
    </StyledParticipants>
  )
}

export default memo(Participants)

const StyledParticipants = styled.div`
  width: 50%;
  position: relative;
  padding: ${p => p.theme.paddingL};
`

const Column = styled.div`
  width: 33%;
`

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${p => p.theme.paddingS};
  margin-bottom: ${p => p.theme.paddingL};
`

const StyledLabel = styled.div`
  color: grey;
  position: relative;
  font-size: ${p => p.theme.textS};
`

const StyledButton = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  color: grey;
  text-align: center;
  text-decoration: underline;
`
