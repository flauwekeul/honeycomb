export function signedModulo(dividend: number, divisor: number) {
  return ((dividend % divisor) + divisor) % divisor
}
