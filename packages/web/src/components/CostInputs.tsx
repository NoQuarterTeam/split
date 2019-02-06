import React, { memo } from "react"
import dayjs from "dayjs"
import styled from "../application/theme"

import { CostInput } from "../graphql/types"
import Input from "./Input"
import Select from "./Select"

type CostInputsProps = {
  formState: CostInput
  setFormState: (val: { [key: string]: any }) => void
}

function CostInputs({ formState, setFormState }: CostInputsProps) {
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
          value={formState.amount === 0 ? "" : formState.amount}
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
          onChange={e =>
            setFormState({ date: dayjs(e.target.value).format("YYYY-MM-DD") })
          }
        />
      </StyledInputWrapper>
      <StyledInputWrapper>
        <Select
          label="recurring"
          value={formState.recurring}
          onChange={e => setFormState({ recurring: e.target.value })}
          options={[
            { value: "one-off", label: "One off" },
            { value: "monthly", label: "Monthly" },
            { value: "weekly", label: "Weekly" },
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
