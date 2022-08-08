import { assertCubeCoordinates, Hex, HexCoordinates } from '../../hex'

export function distance(hex: Pick<Hex, 'offset' | 'isPointy'>, from: HexCoordinates, to: HexCoordinates) {
  const { q: fromQ, r: fromR, s: fromS } = assertCubeCoordinates(hex, from)
  const { q: toQ, r: toR, s: toS } = assertCubeCoordinates(hex, to)
  return Math.max(Math.abs(fromQ - toQ), Math.abs(fromR - toR), Math.abs(fromS - toS))
}
