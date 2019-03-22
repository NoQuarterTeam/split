import queryString from "query-string"

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

export const decimalCount = (value: number) => {
  if (value % 1 !== 0) return value.toString().split(".")[1].length
  return 0
}

const distribute = (divider: number, numerator: number, precision = 2) => {
  const arr = []
  while (divider > 0) {
    const amount =
      Math.round((numerator / divider) * Math.pow(10, precision)) /
      Math.pow(10, precision)
    arr.push(amount)
    numerator -= amount
    divider--
  }
  return arr
}

export const splitTheBill = (people: number, amount: number) =>
  distribute(people, amount)

export const getQueryString = (key: string) => {
  let query: string | null = null
  const queries = queryString.parse(location.search)
  if (queries[key]) {
    query = queries[key] as string
  }
  return query
}
