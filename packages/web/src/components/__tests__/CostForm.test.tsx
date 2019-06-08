import React from "react"
import render, { fireEvent, cleanup } from "../../lib/tests/utils"
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
  const secondParticipantAmount = getAllByTestId(/participant-amount/i)[1]
  fireEvent.click(secondParticipant)
  expect((firstParticipantAmount as HTMLInputElement).value).toBe("10.5")

  const thirdParticipant = getAllByTestId(/participant-avatar/i)[2]
  const thirdParticipantAmount = getAllByTestId(/participant-amount/i)[2]
  fireEvent.click(thirdParticipant)

  expect((firstParticipantAmount as HTMLInputElement).value).toBe("21")

  fireEvent.click(secondParticipant)

  expect((firstParticipantAmount as HTMLInputElement).value).toBe("10.5")
  expect((secondParticipantAmount as HTMLInputElement).value).toBe("10.5")

  fireEvent.change(amount, { target: { value: 10 } })

  expect((firstParticipantAmount as HTMLInputElement).value).toBe("5")
  expect((secondParticipantAmount as HTMLInputElement).value).toBe("5")
  expect((thirdParticipantAmount as HTMLInputElement).value).toBe("")
})
