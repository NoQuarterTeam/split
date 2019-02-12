import React, { memo } from "react"
import styled from "../application/theme"

import { round } from "../lib/helpers"
import { CostInput } from "../graphql/types"
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
          label="name"
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
          label="amount"
          required={true}
          placeholder="0.00"
          type="number"
          value={formState.amount === 0 ? "" : round(formState.amount, 2)}
          onChange={e => {
            if (+e.target.value < 0) return
            setFormState({ amount: +e.target.value })
          }}
        />
      </StyledInputWrapper>
      <StyledInputWrapper>
        <Input
          label="category"
          required={true}
          placeholder="Drinks"
          type="text"
          value={formState.category}
          onChange={e => setFormState({ category: e.target.value })}
        />
      </StyledInputWrapper>
      <StyledInputWrapper>
        <Input
          label="date"
          required={true}
          type="date"
          value={formState.date}
          onChange={e => setFormState({ date: e.target.value })}
        />
      </StyledInputWrapper>
      <StyledInputWrapper>
        <Select
          label="recurring"
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
  width: 60%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-right: ${p => p.theme.paddingXL};
`

const StyledInputWrapper = styled.div`
  width: 50%;
  margin: ${p => p.theme.paddingL} 0;
  padding-right: ${p => p.theme.paddingL};
`
