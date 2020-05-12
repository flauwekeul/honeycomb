import { HexPrototype, Orientation } from '../types'

export const isFlat = ({ orientation }: HexPrototype) => orientation === Orientation.FLAT
