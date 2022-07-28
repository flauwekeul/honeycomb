import { assertCubeCoordinates, AxialCoordinates, equals, Grid, Hex, HexCoordinates, ring } from 'honeycomb-grid'
import { filter, remove } from 'transducist'
import { TARGET_COORDINATES } from './index'
import { AStarOptions, PathData } from './types'

// todo: maybe use https://github.com/bgrins/javascript-astar/blob/master/astar.js to improve performance
export function aStar<T extends Hex>({
  grid,
  start,
  target,
  isPassable,
  getCost = () => 1,
  getDistance = grid.distance.bind(grid),
}: AStarOptions<T>): T[] {
  // todo: probably better to work with hexes (instead of axial coordinates)?
  const open: PathData[] = []
  const closed: PathData[] = []
  const _start = assertCubeCoordinates(grid.hexPrototype, start)
  const _target = assertCubeCoordinates(grid.hexPrototype, target)
  const createPathData = pathDataFactory(getCost, getDistance, _target)
  let targetFound = false

  open.push(createPathData(_start))

  while (open.length > 0 && !targetFound) {
    const current = open.sort((a, b) => a.f - b.f).shift() as PathData

    closed.unshift(current)

    targetFound = equals(current.coordinates, TARGET_COORDINATES)
    if (targetFound) return backtrack(closed, grid)

    grid
      .traverse(ring({ center: current.coordinates, radius: 1 }), [
        filter(isPassable),
        remove((hex) => isInList(closed, hex)),
        // todo: this isn't allowed, because a transducer must always return T, but is that reasonable?
        // map(tile => createPathData(tile))
      ])
      // todo: use forEach() transducer once it exists
      .forEach((neighbor) => {
        if (!isInList(open, neighbor)) {
          const neighborPathData = createPathData(neighbor)
          const nextG = current.g + neighborPathData.g
          if (nextG < neighborPathData.g) {
            // todo: this never occurs?
            console.log(`smaller g (${nextG}) found (was: ${pathDataToString(neighborPathData, true)})`)
          }
          open.push(neighborPathData)
        }
      })
  }

  // no path found
  return []
}

function pathDataFactory(
  getCost: (coordinates: AxialCoordinates) => number,
  getDistance: (from: HexCoordinates, to: HexCoordinates) => number,
  target: AxialCoordinates,
): (coordinates: AxialCoordinates) => PathData {
  return (coordinates: AxialCoordinates) => {
    const g = getCost(coordinates)
    const h = getDistance(coordinates, target)
    return { coordinates, g, h, f: g + h }
  }
}

function isInList(list: PathData[], coordinates: AxialCoordinates): boolean {
  return list.some((pathData) => {
    return equals(coordinates, pathData.coordinates)
  })
}

function pathDataToString({ coordinates: { q, r }, f, g }: PathData, all = false) {
  return `${q},${r}` + (all ? ` - f:${f}, g:${g}` : '')
}

// todo: implement so that only the shortest path is returned
function backtrack<T extends Hex>(list: PathData[], grid: Grid<T>) {
  return list.map(({ coordinates }) => grid.createHex(coordinates)).reverse()
}
