import React, { memo, useState } from "react"

import { styled, Button, Input } from "@noquarter/ui"
import { GroupFragment } from "../lib/graphql/types"
import { useCreateInvite } from "../lib/graphql/invite/hooks"
import Tile from "./styled/Tile"

interface InviteFormProps {
  group: GroupFragment
}
function InviteForm({ group }: InviteFormProps) {
  const [email, setEmail] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const [createInvite] = useCreateInvite()

  const handleCreateInvite = (e: any) => {
    e.preventDefault()
    setLoading(true)
    createInvite({
      variables: { data: { email, groupId: group.id } },
    }).catch(() => {
      setLoading(false)
      setError("error sending invite")
    })
  }

  return (
    <StyledWrapper>
      <StyledForm as="form" onSubmit={handleCreateInvite}>
        <StyledHeader>Now invite someone to join</StyledHeader>
        <br />
        <Input
          label="Group member"
          value={email}
          onChange={setEmail}
          required={true}
        />
        <br />
        <Button loading={loading}>Send invite</Button>
        {error && <StyledError>{error}</StyledError>}
      </StyledForm>
    </StyledWrapper>
  )
}

export default memo(InviteForm)

const StyledWrapper = styled.div`
  height: 100%;
  ${p => p.theme.flexCenter};
`

const StyledForm = styled(Tile)`
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding: ${p => p.theme.paddingL};
`

const StyledHeader = styled.h1``

const StyledError = styled.div`
  opacity: 0.4;
  width: 100%;
  text-align: right;
  padding: ${p => p.theme.paddingM};
  font-size: ${p => p.theme.textS};
`
