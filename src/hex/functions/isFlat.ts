import { HexSettings, Orientations } from '../types'

export const isFlat = ({ orientation }: HexSettings) => orientation === Orientations.FLAT
