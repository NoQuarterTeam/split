import React from "react"
import { render, fireEvent, cleanup } from "../../lib/tests/utils"
import CostForm from "../CostForm"

afterEach(cleanup)

test("tests changing amount and correctly splits", async () => {
  const submit = jest.fn()
  const { getByLabelText, getAllByTestId } = render(
    <CostForm onFormSubmit={submit} />,
  )

  const amount = getByLabelText(/amount/i)
  fireEvent.change(amount, { target: { value: 21 } })

  const firstParticipantAmount = getAllByTestId(/participant-amount/i)[0]
  expect((firstParticipantAmount as HTMLInputElement).value).toBe("7")

  const secondParticipant = getAllByTestId(/participant-avatar/i)[1]
  fireEvent.click(secondParticipant)

  expect((firstParticipantAmount as HTMLInputElement).value).toBe("10.5")
})
