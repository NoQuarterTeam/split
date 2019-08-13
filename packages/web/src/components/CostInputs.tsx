import React, { memo } from "react"

import { styled, Input, Select } from "@noquarter/ui"
import { decimalCount } from "@noquarter/utils"

import { media } from "../application/theme"
import { CostInput } from "../lib/graphql/types"

interface CostInputsProps {
  formState: CostInput
  isEditing: boolean
  setFormState: (val: { [key: string]: any }) => void
}

function CostInputs({ formState, isEditing, setFormState }: CostInputsProps) {
  return (
    <StyledInputs>
      <StyledInputWrapper>
        <Input
          id="name"
          label="Name"
          placeholder="Beers"
          required={true}
          type="text"
          value={formState.name}
          onChange={name => setFormState({ name })}
        />
      </StyledInputWrapper>
      <StyledInputWrapper>
        <Input
          id="amount"
          prefix="€"
          label="Amount"
          required={true}
          placeholder="0.00"
          min="0"
          type="number"
          step="0.01"
          value={formState.amount === 0 ? "" : formState.amount}
          onChange={val => {
            const amount = +val
            if (amount < 0) return
            if (decimalCount(amount) > 2) return
            setFormState({ amount })
          }}
        />
      </StyledInputWrapper>
      <StyledInputWrapper>
        <Select
          id="category"
          label="Category"
          value={formState.category}
          onChange={category => setFormState({ category })}
          options={[
            { value: "food", label: "Food" },
            { value: "drinks", label: "Drinks" },
            { value: "home", label: "Home Supplies" },
            { value: "work", label: "Work Supplies" },
            { value: "rent", label: "Rent" },
            { value: "travel", label: "Travel" },
            { value: "utilities", label: "Utilities" },
            { value: "other", label: "Other" },
          ]}
        />
      </StyledInputWrapper>
      <StyledInputWrapper>
        <Input
          id="date"
          label="Date"
          required={true}
          type="date"
          value={formState.date}
          onChange={date => setFormState({ date })}
        />
      </StyledInputWrapper>
      <StyledInputWrapper>
        <Select
          id="recurring"
          label="Recurring"
          disabled={isEditing}
          value={formState.recurring}
          onChange={recurring => setFormState({ recurring })}
          options={[
            { value: "one-off", label: "One off" },
            { value: "month", label: "Monthly" },
            { value: "week", label: "Weekly" },
          ]}
        />
      </StyledInputWrapper>
    </StyledInputs>
  )
}

export default memo(CostInputs)

const StyledInputs = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-right: 0;

  ${p => media.greaterThan("md")`
    width: 60%;
    padding-right: ${p.theme.paddingXL};
  `}
`

const StyledInputWrapper = styled.div`
  width: 50%;
  margin: ${p => p.theme.paddingL} 0;
  padding-right: ${p => p.theme.paddingL};
`
