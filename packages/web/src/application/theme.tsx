import * as styledComponents from "styled-components"
import { ThemedStyledComponentsModule } from "styled-components"

const theme: IThemeInterface = {
  borderRadius: "5px",
  colorBackground: "#fff",
  colorHeader: "#1b2d41",
  colorPrimary: "#11a9ff",
  colorHighlight: "#fce0f6",
  colorSecondary: "#ed60d3",
  fontBlack: 900,
  fontBold: 400,
  fontNormal: 200,
  paddingL: "20px",
  paddingM: "10px",
  paddingS: "5px",
  paddingXL: "40px",
  paddingXS: "3px",
  textL: "2rem",
  textM: "1.125rem",
  textS: "0.875rem",
  textXL: "2.25rem",
  textXS: "0.625rem",
  flexCenter: `
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  flexBetween: `
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
}

interface IThemeInterface {
  borderRadius: string
  colorBackground: string
  colorPrimary: string
  colorHeader: string
  colorHighlight: string
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
  flexBetween: string
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
