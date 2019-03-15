import React, { FC } from "react"
import styled, { media } from "../application/theme"

import IconClose from "../assets/images/icon-close.svg"
import useEventListener from "../lib/hooks/useEventListener"

interface QuickPageProps {
  title: string
}

const QuickPage: FC<QuickPageProps> = ({ children, title }) => {
  const handleGoBack = () => {
    window.history.back()
  }
  const handleKeyDown = (e: any) => {
    if (e.key === "Escape") handleGoBack()
  }
  useEventListener("keydown", handleKeyDown)

  return (
    <StyledQuickPage>
      <StyledTopbar>
        <StyledHeader>{title}</StyledHeader>
        <StyledClose onClick={handleGoBack}>
          <img
            height={60}
            src={IconClose}
            alt="close"
            style={{ minHeight: 60 }}
          />
          <span>Esc</span>
        </StyledClose>
      </StyledTopbar>
      {children}
    </StyledQuickPage>
  )
}

export default QuickPage

const StyledQuickPage = styled.div`
  min-height: ${window.innerHeight}px;
  width: 100vw;
  background-color: white;
`

const StyledTopbar = styled.div`
  padding: ${p => p.theme.paddingL};
  padding-bottom: ${p => p.theme.paddingM};
  ${p => p.theme.flexBetween};
  align-items: flex-start;

  ${p => media.greaterThan("sm")`
    padding: ${p.theme.paddingXL};
		padding-bottom: ${p.theme.paddingM};
  `}
`

const StyledHeader = styled.h2`
  color: ${p => p.theme.colorHeader};
  font-size: ${p => p.theme.textXL};
  font-weight: ${p => p.theme.fontNormal};
`

const StyledClose = styled.div`
  flex-direction: column;
  cursor: pointer;
  color: ${p => p.theme.colorLabel};
  ${p => p.theme.flexCenter};

  &:hover {
    opacity: 0.9;
  }

  span {
    display: none;
    ${media.greaterThan("md")`
      display: block;
    `}
  }
`
