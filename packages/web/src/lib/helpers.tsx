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
