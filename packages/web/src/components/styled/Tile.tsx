import { styled } from "@noquarter/ui"

const Tile = styled.div`
  width: 100%;
  background-color: white;
  box-shadow: ${p => p.theme.boxShadow};
  border-radius: ${p => p.theme.borderRadius};
`

export default Tile
