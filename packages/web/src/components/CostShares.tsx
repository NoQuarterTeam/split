import React, { memo } from "react"
import Participant from "./Participant"
import Button from "./Button"
import { User, CostInput } from "../lib/graphql/types"
import styled, { media } from "../application/theme"
import Alert from "./Alert"
import Column from "./styled/Column"

type CostSharesProps = {
  users: User.Fragment[]
  equalSplit: boolean
  isDifferent: boolean
  formState: CostInput
  setFormState: (val: { [key: string]: any }) => void
  setEqualSplit: (val: boolean) => void
  applyEqualSplit: () => void
}
function CostShares({
  users,
  equalSplit,
  formState,
  isDifferent,
  setFormState,
  setEqualSplit,
  applyEqualSplit,
}: CostSharesProps) {
  return (
    <StyledCostShares>
      {!equalSplit && isDifferent && (
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

      {isDifferent && !equalSplit && (
        <StyledButtonWrapper>
          <Button color="pink" variant="secondary" onClick={applyEqualSplit}>
            Split equally
          </Button>
        </StyledButtonWrapper>
      )}
    </StyledCostShares>
  )
}

export default memo(CostShares)

const StyledCostShares = styled.div`
  width: 100%;
  position: relative;
  padding: ${p => p.theme.paddingL};
  margin-top: ${p => p.theme.paddingL};

  ${media.greaterThan("md")`
    width: 40%;
    margin-top: 0;
  `}
`

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${p => p.theme.paddingS};
  margin-bottom: ${p => p.theme.paddingL};
`

const StyledLabel = styled.div`
  color: ${p => p.theme.colorLabel};
  position: relative;
  font-size: ${p => p.theme.textS};
`

const StyledAlertWrapper = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: -${p => p.theme.paddingL};
  ${p => p.theme.flexCenter};

  ${p => media.greaterThan("sm")`
    top: -${p.theme.paddingXL};
  `}
`

const StyledButtonWrapper = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  ${p => p.theme.flexCenter};
  bottom: ${p => p.theme.paddingS};

  ${p => media.greaterThan("sm")`
    bottom: -${p.theme.paddingM};
  `}
`
