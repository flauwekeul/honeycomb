/**
 * Modulo operator (instead of remainder operator `%`).
 * See the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder#:~:text=To%20obtain%20a%20modulo%20in%20JavaScript%2C%20in%20place%20of%20n%20%25%20d%2C%20use%20((n%20%25%20d)%20%2B%20d)%20%25%20d. MDN web docs} for more information.
 *
 * @category Util
 */
export function signedModulo(dividend: number, divisor: number) {
  return ((dividend % divisor) + divisor) % divisor
}
