import React, { Fragment, FC } from "react"
import { styled } from "@noquarter/ui"
import { useDebounce } from "@noquarter/hooks"

interface LoadingProps {
  loading: boolean
}

const Loading: FC<LoadingProps> = ({ loading, children }) => {
  const isLoading = useDebounce(loading, 200)
  return (
    <Fragment>
      <StyledContainer isLoading={isLoading} />
      {!isLoading && children}
    </Fragment>
  )
}

export default Loading

const StyledContainer = styled.div<{ isLoading: boolean }>`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: white;
  transition: opacity 1s, visibility -0.3s linear 1s;

  ${p => p.theme.flexCenter};
  visibility: ${p => (p.isLoading ? "visible" : "hidden")};
  opacity: ${p => (p.isLoading ? 1 : 0)};
`
