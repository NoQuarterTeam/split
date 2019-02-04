import React, { memo, ReactNode } from "react"
import styled from "../application/theme"
import useDebounce from "../hooks/useDebounce"

interface ILoadingProps {
  loading: boolean
  children?: ReactNode
}

function Loading({ loading, children }: ILoadingProps) {
  const isLoading = useDebounce(loading, 500)
  return (
    <React.Fragment>
      <StyledContainer loading={isLoading} />
      {!isLoading && children}
    </React.Fragment>
  )
}

const StyledContainer = styled.div<{ loading: boolean }>`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  transition: opacity 0.4s, visibility -0.3s linear 0.5s;

  ${p => p.theme.flexCenter};
  background-color: ${p => p.theme.colorBackground};
  visibility: ${p => (p.loading ? "visible" : "hidden")};
  opacity: ${p => (p.loading ? 1 : 0)};
`

export default memo(Loading)
