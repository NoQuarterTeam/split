import React, { memo } from "react"
import { RouteComponentProps, Link, navigate } from "@reach/router"

import styled from "../../application/theme"
import IconClose from "../../assets/images/icon-close.svg"
import useEventListener from "../../hooks/useEventListener"

import Form from "./Form"

function NewCost(_: RouteComponentProps) {
  const handleCloseForm = (e: any) => {
    if (e.key === "Escape") navigate("/")
  }
  useEventListener("keydown", handleCloseForm)

  return (
    <div>
      <StyledTopbar>
        <StyledHeader>New cost</StyledHeader>
        <Link to="/" tabIndex={-1}>
          <StyledClose>
            <StyledIcon src={IconClose} alt="close" />
            Esc
          </StyledClose>
        </Link>
      </StyledTopbar>
      <Form />
    </div>
  )
}

export default memo(NewCost)

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
  ${p => p.theme.flexCenter};
`

const StyledIcon = styled.img`
  width: 60px;
  &:hover {
    opacity: 0.9;
  }
`
