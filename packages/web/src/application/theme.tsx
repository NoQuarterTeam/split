import * as styledComponents from "styled-components"
import { ThemedStyledComponentsModule } from "styled-components"
import { generateMedia } from "styled-media-query"

const media = generateMedia({
  xl: "1440px",
  lg: "1170px",
  md: "768px",
  sm: "450px",
})

const theme: (small: boolean) => IThemeInterface = small => ({
  borderRadius: "5px",
  colorBackground: "#fff",
  colorLightGrey: "#f8f9fd",
  colorHeader: "#1b2d41",
  colorPrimary: "#11a9ff",
  colorPrimaryOverlay: "#0D75AF",
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
  textL: small ? "1.75rem" : "2rem",
  textM: small ? "1rem" : "1.125rem",
  textS: small ? "0.75rem" : "0.875rem",
  textXL: small ? "2rem" : "2.25rem",
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
  flexAround: `
    display: flex;
    align-items: center;
    justify-content: space-around;
  `,
})

interface IThemeInterface {
  borderRadius: string
  colorBackground: string
  colorLightGrey: string
  colorPrimary: string
  colorPrimaryOverlay: string
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
  flexAround: string
}

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<IThemeInterface>

export { theme, css, createGlobalStyle, keyframes, ThemeProvider, media }
export default styled
