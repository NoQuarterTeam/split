import React, { memo } from "react"
import dayjs from "dayjs"
import styled from "../../application/theme"

import { CostInput } from "../../graphql/types"

type InputsProps = {
  formState: CostInput
  setFormState: (val: { [key: string]: any }) => void
}

function Inputs({ formState, setFormState }: InputsProps) {
  return (
    <StyledInputs>
      <StyledInput
        type="text"
        value={formState.name}
        onChange={e => setFormState({ name: e.target.value })}
      />
      <StyledInput
        type="number"
        value={formState.amount}
        onChange={e => setFormState({ amount: +e.target.value })}
      />
      <StyledInput
        type="text"
        value={formState.category}
        onChange={e => setFormState({ category: e.target.value })}
      />
      <select
        value={formState.recurring || "default"}
        onChange={e => setFormState({ recurring: e.target.value })}
      >
        <option value="default" disabled={true}>
          No
        </option>
        <option value="monthly">Montly</option>
        <option value="weekly">Weekly</option>
      </select>
      <input
        type="date"
        value={formState.date}
        onChange={e =>
          setFormState({ date: dayjs(e.target.value).format("YYYY-MM-DD") })
        }
      />
    </StyledInputs>
  )
}

export default memo(Inputs)

const StyledInputs = styled.div`
  width: 60%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
`

const StyledInput = styled.input`
  border: 0;
  width: 50%;
  background-color: ${p => p.theme.colorBackground};
  padding: ${p => p.theme.paddingS};
  border-bottom: 2px solid ${p => p.theme.colorHighlight};
`
