import { HexSettings, Orientation } from '../types'

export const isFlat = ({ orientation }: HexSettings) => orientation === Orientation.FLAT
