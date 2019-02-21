import React, { memo } from "react"
import styled, { media } from "../application/theme"

import { decimalCount } from "../lib/helpers"
import { CostInput } from "../lib/graphql/types"
import Input from "./Input"
import Select from "./Select"

type CostInputsProps = {
  formState: CostInput
  isEditing: boolean
  setFormState: (val: { [key: string]: any }) => void
}

function CostInputs({ formState, isEditing, setFormState }: CostInputsProps) {
  return (
    <StyledInputs>
      <StyledInputWrapper>
        <Input
          label="Name"
          placeholder="Beers"
          required={true}
          type="text"
          value={formState.name}
          onChange={e => setFormState({ name: e.target.value })}
        />
      </StyledInputWrapper>
      <StyledInputWrapper>
        <Input
          prefix="€"
          label="Amount"
          required={true}
          placeholder="0.00"
          min="0"
          type="number"
          step="0.01"
          value={formState.amount === 0 ? "" : formState.amount}
          onChange={e => {
            const val = +e.target.value
            if (val < 0) return
            if (decimalCount(+e.target.value) > 2) return
            setFormState({ amount: val })
          }}
        />
      </StyledInputWrapper>
      <StyledInputWrapper>
        <Select
          label="Category"
          value={formState.category}
          onChange={e => setFormState({ category: e.target.value })}
          options={[
            { value: "food", label: "Food" },
            { value: "drinks", label: "Drinks" },
            { value: "home", label: "Home Supplies" },
            { value: "work", label: "Work Supplies" },
            { value: "rent", label: "Rent" },
            { value: "utilities", label: "Utilities" },
            { value: "other", label: "Other" },
          ]}
        />
      </StyledInputWrapper>
      <StyledInputWrapper>
        <Input
          label="Date"
          required={true}
          type="date"
          value={formState.date}
          onChange={e => setFormState({ date: e.target.value })}
        />
      </StyledInputWrapper>
      <StyledInputWrapper>
        <Select
          label="Recurring"
          disabled={isEditing}
          value={formState.recurring}
          onChange={e => setFormState({ recurring: e.target.value })}
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

  ${p => media.greaterThan("sm")`
    width: 60%;
    padding-right: ${p.theme.paddingXL};
  `}
`

const StyledInputWrapper = styled.div`
  width: 50%;
  margin: ${p => p.theme.paddingL} 0;
  padding-right: ${p => p.theme.paddingL};
`
