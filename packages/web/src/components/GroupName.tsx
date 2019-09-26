import React, { useState, memo, useRef } from "react"

import { styled } from "@noquarter/ui"
import { useEditGroup } from "../lib/graphql/group/hooks"
import { GroupFragment } from "../lib/graphql/types"

interface GroupNameProps {
  group: GroupFragment
}

function GroupName({ group }: GroupNameProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [groupName, setGroupName] = useState<string>(group.name)

  const [updateGroup] = useEditGroup()

  const handleGroupUpdate = (e: any) => {
    e.preventDefault()
    if (!groupName) return setGroupName(group.name)
    updateGroup({
      variables: {
        groupId: group.id,
        data: {
          currency: group.currency || "Euro",
          name: groupName,
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        editGroup: {
          ...group,
          name: groupName,
        },
      },
    })
    if (inputRef.current) inputRef.current.blur()
  }
  return (
    <form onSubmit={handleGroupUpdate}>
      <StyledInput
        ref={inputRef}
        value={groupName}
        onBlur={handleGroupUpdate}
        onChange={e => setGroupName(e.target.value)}
      />
    </form>
  )
}

export default memo(GroupName)

const StyledInput = styled.input`
  outline: 0;
  width: 100%;
  border: 0;
  padding: 0;
  border: 2px solid transparent;
  background-color: transparent;
  color: ${p => p.theme.colorText};
  border-radius: ${p => p.theme.borderRadius};
  font-size: ${p => p.theme.textL};
  font-weight: ${p => p.theme.fontExtraBold};
`
