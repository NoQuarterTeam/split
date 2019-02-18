import React, { Fragment, useContext } from "react"
import { RouteComponentProps, Redirect } from "@reach/router"
import { useMutation } from "react-apollo-hooks"

import styled from "../../application/theme"
import IconClose from "../../assets/images/icon-close.svg"
import useEventListener from "../../lib/hooks/useEventListener"

import { CREATE_COST, GET_ALL_COSTS } from "../../lib/graphql/costs/queries"
import { CreateCost, CostInput } from "../../lib/graphql/types"
import { GET_HOUSE } from "../../lib/graphql/house/queries"

import CostForm from "../../components/CostForm"
import { AppContext } from "../../application/context"

function NewCost(props: RouteComponentProps) {
  const { user } = useContext(AppContext)
  if (!user!.houseId) return <Redirect to="/" noThrow={true} />

  const handleCloseForm = (e: any) => {
    if (e.key === "Escape") handleGoBack()
  }
  useEventListener("keydown", handleCloseForm)

  const createCost = useMutation<CreateCost.Mutation, CreateCost.Variables>(
    CREATE_COST,
    {
      awaitRefetchQueries: true,
    },
  )

  const handleCreateCost = (costData: CostInput) => {
    return createCost({
      variables: {
        data: costData,
      },
      refetchQueries: [
        { query: GET_HOUSE },
        { query: GET_ALL_COSTS, variables: { houseId: user!.houseId } },
      ],
    }).then(() => {
      props.navigate!("/")
    })
  }

  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <Fragment>
      <StyledTopbar>
        <StyledHeader>New cost</StyledHeader>
        <StyledClose onClick={handleGoBack}>
          <img width={60} src={IconClose} alt="close" />
          Esc
        </StyledClose>
      </StyledTopbar>
      <CostForm onFormSubmit={handleCreateCost} />
    </Fragment>
  )
}

export default NewCost

const StyledTopbar = styled.div`
  padding: ${p => p.theme.paddingXL};
  ${p => p.theme.flexBetween};
`

const StyledHeader = styled.h2`
  color: ${p => p.theme.colorHeader};
  font-size: ${p => p.theme.textXL};
  font-weight: ${p => p.theme.fontNormal};
`

const StyledClose = styled.div`
  color: lightgrey;
  flex-direction: column;
  cursor: pointer;
  ${p => p.theme.flexCenter};
  &:hover {
    opacity: 0.9;
  }
`
