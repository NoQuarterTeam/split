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
      <StyledContainer loading={isLoading} />
      {!isLoading && children}
    </Fragment>
  )
}

export default Loading

const StyledContainer = styled.div<{ loading: boolean }>`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: white;
  transition: opacity 1s, visibility -0.3s linear 1s;

  ${p => p.theme.flexCenter};
  visibility: ${p => (p.loading ? "visible" : "hidden")};
  opacity: ${p => (p.loading ? 1 : 0)};
`
