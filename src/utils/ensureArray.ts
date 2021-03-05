export const ensureArray = <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value])
