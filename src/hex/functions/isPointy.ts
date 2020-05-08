import { HexPrototype, Orientation } from '../types'

export const isPointy = ({ orientation }: HexPrototype) => orientation === Orientation.POINTY
