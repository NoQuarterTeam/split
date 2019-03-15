import React, { memo } from "react"
import Participant from "./Participant"
import Button from "./Button"
import { CostInput, User } from "../lib/graphql/types"
import styled, { media } from "../application/theme"
import Alert from "./Alert"
import Column from "./styled/Column"
import { round } from "../lib/helpers"

type CostSharesProps = {
  users: User.Fragment[]
  isDifferent: boolean
  formState: CostInput
  setFormState: (val: { [key: string]: any }) => void
  applyEqualSplit: () => void
}
function CostShares({
  users,
  formState,
  isDifferent,
  setFormState,
  applyEqualSplit,
}: CostSharesProps) {
  const totalCostShares = formState.costShares.sumBy("amount")
  const amountRemaining = round(formState.amount - totalCostShares, 2)
  return (
    <StyledCostShares>
      {isDifferent &&
      !formState.equalSplit && ( // Requires equal split to stop flashing
          <StyledAlertWrapper>
            <Alert
              text={`Split must equal amount ( € ${amountRemaining} remaining )`}
            />
          </StyledAlertWrapper>
        )}
      <StyledHeader>
        <Column flex={4}>
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
            isPayer={user.id === formState.payerId}
            user={user}
            shares={formState.costShares}
            setFormState={setFormState}
          />
        )
      })}

      {(isDifferent || !formState.equalSplit) && (
        <StyledButtonWrapper>
          <Button
            type="button"
            color="pink"
            variant="secondary"
            onClick={applyEqualSplit}
          >
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
  margin: ${p => p.theme.paddingXL} 0;

  ${media.greaterThan("md")`
    width: 40%;
    margin: 0;
  `}
`

const StyledHeader = styled.div`
  ${p => p.theme.flexBetween};
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
  top: -${p => p.theme.paddingXL};
  ${p => p.theme.flexCenter};
`

const StyledButtonWrapper = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  bottom: -30px;
  ${p => p.theme.flexCenter};
`
