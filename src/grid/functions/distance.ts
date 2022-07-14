import { assertCubeCoordinates, HexCoordinates, HexPrototype } from '../../hex'

export function distance(
  hexPrototype: Pick<HexPrototype, 'offset' | 'isPointy'>,
  from: HexCoordinates,
  to: HexCoordinates,
) {
  const { q: fromQ, r: fromR, s: fromS = -fromQ - fromR } = assertCubeCoordinates(hexPrototype, from)
  const { q: toQ, r: toR, s: toS = -toQ - toR } = assertCubeCoordinates(hexPrototype, to)
  return Math.max(Math.abs(fromQ - toQ), Math.abs(fromR - toR), Math.abs(fromS - toS))
}
