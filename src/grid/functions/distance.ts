import { Hex, HexCoordinates, toCube } from '../../hex'

export function distance(hex: Pick<Hex, 'offset' | 'isPointy'>, from: HexCoordinates, to: HexCoordinates) {
  const { q: fromQ, r: fromR, s: fromS } = toCube(hex, from)
  const { q: toQ, r: toR, s: toS } = toCube(hex, to)
  return Math.max(Math.abs(fromQ - toQ), Math.abs(fromR - toR), Math.abs(fromS - toS))
}
