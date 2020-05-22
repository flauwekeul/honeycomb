import { HexSettings, Orientation } from '../types'

export const isPointy = ({ orientation }: HexSettings) => orientation === Orientation.POINTY
