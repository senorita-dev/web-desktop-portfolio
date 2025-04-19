export function assertNever(value: never) {
  throw new Error(`Invalid value: ${value}`)
}
