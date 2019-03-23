import React from "react"
import { render, fireEvent, cleanup } from "../../lib/tests/utils"
import CostForm from "../CostForm"

afterEach(cleanup)

test("tests changing amount and correctly splits", async () => {
  const submit = jest.fn()
  const { getByLabelText, getAllByTestId } = render(
    <CostForm onFormSubmit={submit} />,
  )

  const input = getByLabelText(/Amount/i)

  fireEvent.change(input, { target: { value: 21 } })

  const participantInput = getAllByTestId(/participant-amount/i)[0]
  expect((participantInput as HTMLInputElement).value).toBe("7")
})
