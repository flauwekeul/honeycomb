/**
 * Determines whether the passed value is a finite number (excluding `NaN`).
 *
 * @category Util
 */
export const isNumber = (value: unknown): value is number => Number.isFinite(value) && !Number.isNaN(value)
