// todo: rename (also rename offset)?
// todo: change to https://www.redblobgames.com/grids/hexagons/#conversions-offset
export const offsetFromZero = (offset: number, distance: number) => (distance + offset * (distance & 1)) >> 1
