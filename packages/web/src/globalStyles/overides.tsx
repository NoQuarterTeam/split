import { css } from "../application/theme"

const overides = css`
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="date"]::-webkit-inner-spin-button,
  input[type="date"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export default overides
