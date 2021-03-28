import { HexSettings, Orientations } from '../types'

export const isPointy = ({ orientation }: HexSettings) => orientation === Orientations.POINTY
