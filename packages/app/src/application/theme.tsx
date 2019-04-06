import * as styledComponents from "styled-components"
import { ThemedStyledComponentsModule } from "styled-components"
import { darken, lighten } from "polished"

const theme: (isDark: boolean) => ThemeInterface = isDark => ({
  colorPage: isDark ? "#2f3335" : "white",
  colorBackground: isDark ? "#373c3f" : "#f8f9fd",
  colorPlaceholder: isDark ? "#6f7172" : "#d3d3d3",
  colorShadow: isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(200, 200, 200, 0.1)",
  colorLabel: isDark ? "#81878a" : "#b1bbc4",
  colorText: isDark ? "#ebecec" : "#1b2d41",
  colorPink: "#ed60d3",
  colorBlue: "#11a9ff",
  fontBlack: 900,
  fontBold: 400,
  fontNormal: 200,
  paddingL: "20px",
  paddingM: "10px",
  paddingS: "5px",
  paddingXL: "40px",
  paddingXS: "3px",
  borderRadius: "5px",
  textL: "1.5rem",
  textM: "1rem",
  textS: "0.75rem",
  textXL: "2rem",
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

export interface ThemeInterface {
  colorPage: string
  borderRadius: string
  colorBackground: string
  colorText: string
  colorLabel: string
  colorShadow: string
  colorPlaceholder: string
  colorPink: string
  colorBlue: string
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
  [key: string]: any
}

const {
  default: styled,
  css,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<ThemeInterface>

export { theme, css, ThemeProvider, darken, lighten }
export default styled
