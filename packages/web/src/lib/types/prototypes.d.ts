interface Array {
  groupBy<T>(key: string): Array<{ key: string; values: T[] }>
}
