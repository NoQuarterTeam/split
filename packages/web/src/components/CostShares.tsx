import React, { memo } from "react"
import Participant from "./Participant"
import Button from "./Button"
import { User, CostInput } from "../lib/graphql/types"
import styled from "../application/theme"
import Alert from "./Alert"
import Column from "./styled/Column"

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
      {!equalSplit && difference && (
        <StyledAlertWrapper>
          <Alert text="Split must equal amount" />
        </StyledAlertWrapper>
      )}
      <StyledHeader>
        <Column flex={3}>
          <StyledLabel>Participants</StyledLabel>
        </Column>
        <Column flex={3}>
          <StyledLabel>Split</StyledLabel>
        </Column>
        <Column flex={1}>
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
          <Button variant="alternative" onClick={applyEqualSplit}>
            Split equally
          </Button>
        </StyledButtonWrapper>
      )}
    </StyledCostShares>
  )
}

export default memo(CostShares)

const StyledCostShares = styled.div`
  width: 40%;
  position: relative;
  padding: ${p => p.theme.paddingL};
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

const StyledAlertWrapper = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: -${p => p.theme.paddingXL};
  ${p => p.theme.flexCenter};
`

const StyledButtonWrapper = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  bottom: -${p => p.theme.paddingM};
  ${p => p.theme.flexCenter};
`
