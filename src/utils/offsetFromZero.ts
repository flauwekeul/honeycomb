// todo: rename (also rename offset)?
export const offsetFromZero = (offset: number, distance: number) => (distance + offset * (distance & 1)) >> 1
