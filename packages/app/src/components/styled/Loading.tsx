import React, { FC } from "react"
import styled from "../../application/theme"

const Loading: FC = () => <StyledContainer />

export default Loading

const StyledContainer = styled.View`
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: ${p => p.theme.colorPage};

  ${p => p.theme.flexCenter};
`
