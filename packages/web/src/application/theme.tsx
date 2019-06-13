import { generateMedia } from "styled-media-query"
import { defaultTheme } from "@noquarter/ui"

const media = generateMedia({
  xl: "1440px",
  lg: "1170px",
  md: "768px",
  sm: "450px",
})

const theme = (small: boolean, isDark: boolean) => ({
  ...defaultTheme,
  colorBackground: isDark ? "#373c3f" : "#f8f9fd",
  colorShadow: isDark ? "rgba(0, 0, 0, 0.1)" : "rgba(200, 200, 200, 0.1)",
  colorLabel: isDark ? "#81878a" : "#b1bbc4",
  colorText: isDark ? "#ebecec" : "#1b2d41",
  textL: small ? "1.5rem" : "1.75rem",
  textM: small ? "1rem" : "1.125rem",
  textS: small ? "0.75rem" : "0.875rem",
  textXL: small ? "2rem" : "2.25rem",
})

export { theme, media }
