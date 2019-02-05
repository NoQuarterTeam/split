import { css } from "../application/theme"

export const snakeToCamel = (value: string) =>
  value.replace(/_(\w)/g, m => m[1].toUpperCase())

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const round = (value: number, places = 2) => {
  const exp = Math.pow(10, places)
  return Math.round(value * exp) / exp
}

export const sleep = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), delay)
  })
}

export const countDecimals = (value: number) => {
  if (value % 1 != 0) return value.toString().split(".")[1].length
  return 0
}

const sizes: ISize = {
  desktop: 992,
  tablet: 768,
  phone: 576,
}

type ISize = {
  desktop: number
  tablet: number
  phone: number
  [key: string]: number
}

// Iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((acc: any, label: string) => {
  acc[label] = (...args: any) => css`
    @media (min-width: ${sizes[label] / 16}em) {
      ${css(args)}
    }
  `
  return acc
}, {})
