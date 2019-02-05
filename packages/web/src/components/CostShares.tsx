import React, { memo } from "react"
import Participant from "./Participant"
import Button from "./Button"
import { User, CostInput } from "../graphql/types"
import styled from "../application/theme"
import Alert from "./Alert"

type CostSharesProps = {
  users: User.Fragment[]
  equalSplit: boolean
  difference: boolean
  formState: CostInput
  setFormState: (val: { [key: string]: any }) => void
  setEqualSplit: (val: boolean) => void
  applyEqualSplit: () => void
}
function CostShares({
  users,
  equalSplit,
  formState,
  difference,
  setFormState,
  setEqualSplit,
  applyEqualSplit,
}: CostSharesProps) {
  return (
    <StyledCostShares>
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
        <StyledButtonWrapper>
          <Button variant="secondary" onClick={applyEqualSplit}>
            Split equally
          </Button>
        </StyledButtonWrapper>
      )}
    </StyledCostShares>
  )
}

export default memo(CostShares)

const StyledCostShares = styled.div`
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

const StyledButtonWrapper = styled.div`
  ${p => p.theme.flexCenter};
`
