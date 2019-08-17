export interface Currency {
  Euro: string
  Dollar: string
  "British Pound": string
  [key: string]: string
}

const currencies: Currency = {
  Euro: "€",
  Dollar: "$",
  "British Pound": "£",
}

export default currencies
