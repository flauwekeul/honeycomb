export const isNumber = (value: unknown): value is number => Number.isFinite(value) && !Number.isNaN(value)
