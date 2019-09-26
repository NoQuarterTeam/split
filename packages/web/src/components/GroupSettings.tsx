import React, { FC, useState } from "react"
import { styled, Input, Select, Button } from "@noquarter/ui"
import { GroupFragment } from "../lib/graphql/types"
import { useEditGroup } from "../lib/graphql/group/hooks"
import currencies from "../lib/data/currencies"

interface Props {
  group: GroupFragment
}
const GroupSettings: FC<Props> = ({ group }) => {
  const [name, setName] = useState<string>(group.name)
  const [currency, setCurrency] = useState<string>(group.currency || "Euro")

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const [updateGroup] = useEditGroup()

  const handleGroupUpdate = (e: any) => {
    e.preventDefault()
    if (!name) return setName(group.name)
    setLoading(true)
    updateGroup({
      variables: {
        groupId: group.id,
        data: {
          currency: currency,
          name: name,
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        editGroup: {
          ...group,
          currency,
          name,
        },
      },
    })
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false)
        setError("Error updating group")
      })
  }
  const currencyOptions = Object.entries(currencies).map(([name, symbol]) => ({
    value: name,
    label: `${symbol} - ${name}`,
  }))
  return (
    <StyledWrapper>
      <StyledHeader>Group</StyledHeader>
      <form onSubmit={handleGroupUpdate} style={{ width: "100%" }}>
        <Input
          label="Group name"
          value={name}
          onChange={setName}
          placeholder="201 Columbusplein"
          required={true}
        />
        <br />
        <Select
          label="Currency"
          value={currency}
          onChange={setCurrency}
          options={currencyOptions}
          required={true}
        />
        <br />

        <Button loading={loading}>Update group</Button>
        {error && <StyledError>{error}</StyledError>}
      </form>
    </StyledWrapper>
  )
}

export default GroupSettings

const StyledWrapper = styled.div`
  width: 100%;
  ${p => p.theme.flexCenter};
  flex-direction: column;
`

const StyledHeader = styled.h3`
  color: ${p => p.theme.colorText};
  font-size: ${p => p.theme.textL};
  font-weight: ${p => p.theme.fontNormal};
  margin-bottom: ${p => p.theme.paddingM};
`

const StyledError = styled.div`
  opacity: 0.4;
  width: 100%;
  text-align: right;
  padding: ${p => p.theme.paddingM};
  font-size: ${p => p.theme.textS};
`
