import * as styledComponents from "styled-components"
import { ThemedStyledComponentsModule } from "styled-components"

const theme: IThemeInterface = {
  borderRadius: "5px",
  colorBackground: "#fff",
  colorPrimary: "papayawhip",
  colorSecondary: "lightsalmon",
  fontBlack: 900,
  fontBold: 700,
  fontNormal: 400,
  paddingL: "20px",
  paddingM: "10px",
  paddingS: "5px",
  paddingXL: "40px",
  paddingXS: "3px",
  textL: "1.5rem",
  textM: "1.125rem",
  textS: "0.875rem",
  textXL: "2.25rem",
  textXS: "0.625rem",
  flexCenter: `
    display: flex;
    align-items: center;
    justify-content: center;
  `,
}

interface IThemeInterface {
  borderRadius: string
  colorBackground: string
  colorPrimary: string
  colorSecondary: string
  fontBlack: number
  fontBold: number
  fontNormal: number
  paddingL: string
  paddingM: string
  paddingS: string
  paddingXL: string
  paddingXS: string
  textL: string
  textM: string
  textS: string
  textXL: string
  textXS: string
  flexCenter: string
}

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<IThemeInterface>

export { theme, css, createGlobalStyle, keyframes, ThemeProvider }
export default styled
