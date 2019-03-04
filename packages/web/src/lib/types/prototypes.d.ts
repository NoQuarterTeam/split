interface Array {
  groupBy<T>(key: string): Array<{ key: string; values: T[] }>
}

interface Array {
  sumBy<number>(key: string): number
}
