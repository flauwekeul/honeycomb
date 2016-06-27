import { expect } from 'chai'
import Grid from '../../src/grid'
import Hex from '../../src/hex'

describe('Grid prototype', () => {
    const grid = Grid({ hex: { size: 20, orientation: 'pointy' } })

    describe('colSize', () => {
        describe('when hexes are pointy', () => {
            before(() => Hex.prototype.orientation('pointy'))

            it('returns the size of the grid\'s columns', () => {
                expect(grid.colSize()).to.be.closeTo(8.6603, 0.0005)
            })
        })

        describe('when hexes are flat', () => {
            before(() => Hex.prototype.orientation('flat'))

            it('returns the size of the grid\'s columns', () => {
                expect(grid.colSize()).to.be.closeTo(7.5, 0.0005)
            })
        })
    })

    describe('rowSize', () => {
        describe('when hexes are pointy', () => {
            before(() => Hex.prototype.orientation('pointy'))

            it('returns the size of the grid\'s rows', () => {
                expect(grid.rowSize()).to.be.closeTo(7.5, 0.0005)
            })
        })

        describe('when hexes are flat', () => {
            before(() => Hex.prototype.orientation('flat'))

            it('returns the size of the grid\'s rows', () => {
                expect(grid.rowSize()).to.be.closeTo(8.6603, 0.0005)
            })
        })
    })

    describe('parallelogram', () => {
        describe('when called without start', () => {
            it('returns the hexes in a parallelogram shape, starting at 0,0,0', () => {
                const hexCoordinates = grid.parallelogram(2, 2).map(hex => hex.coordinates())
                expect(hexCoordinates).to.deep.include.members([
                    Hex(0, 0).coordinates(),
                    Hex(1, 0).coordinates(),
                    Hex(0, 1).coordinates(),
                    Hex(1, 1).coordinates()
                ])
            })
        })

        describe('when called with start', () => {
            it('returns the hexes in a parallelogram shape, starting at the given start', () => {
                const hexCoordinates = grid.parallelogram(2, 2, [ 5, 4 ]).map(hex => hex.coordinates())
                expect(hexCoordinates).to.deep.include.members([
                    Hex(5, 4).coordinates(),
                    Hex(6, 4).coordinates(),
                    Hex(5, 5).coordinates(),
                    Hex(6, 5).coordinates()
                ])
            })
        })
    })

    describe('triangle', () => {
        describe('when called without start', () => {
            it('returns the hexes in a triangle shape, starting at 0,0,0', () => {
                const hexCoordinates = grid.triangle(2).map(hex => hex.coordinates())
                expect(hexCoordinates).to.deep.include.members([
                    Hex(0, 0).coordinates(),
                    Hex(0, 1).coordinates(),
                    Hex(1, 0).coordinates()
                ])
            })
        })

        describe('when called with start', () => {
            it('returns the hexes in a triangle shape, starting at the given start', () => {
                const hexCoordinates = grid.triangle(2, [ 3, 6 ]).map(hex => hex.coordinates())
                expect(hexCoordinates).to.deep.include.members([
                    Hex(3, 6).coordinates(),
                    Hex(3, 7).coordinates(),
                    Hex(4, 6).coordinates()
                ])
            })
        })
    })

    describe('hexagon', () => {
        describe('when called without start', () => {
            it('returns the hexes in a hexagon shape, with its center at 0,0,0', () => {
                const hexCoordinates = grid.hexagon(2).map(hex => hex.coordinates())
                expect(hexCoordinates).to.deep.include.members([
                    Hex(0, -1).coordinates(),
                    Hex(1, -1).coordinates(),
                    Hex(-1, 0).coordinates(),
                    Hex(0, 0).coordinates(),
                    Hex(1, 0).coordinates(),
                    Hex(-1, 1).coordinates(),
                    Hex(0, 1).coordinates()
                ])
            })
        })

        describe('when called with start', () => {
            it('returns the hexes in a hexagon shape, with its center at the given center', () => {
                const hexCoordinates = grid.hexagon(2, [ 3, 1 ]).map(hex => hex.coordinates())
                expect(hexCoordinates).to.deep.include.members([
                    Hex(3, 0).coordinates(),
                    Hex(4, 0).coordinates(),
                    Hex(2, 1).coordinates(),
                    Hex(3, 1).coordinates(),
                    Hex(4, 1).coordinates(),
                    Hex(2, 2).coordinates(),
                    Hex(3, 2).coordinates()
                ])
            })
        })
    })

    describe('rectangle', () => {
        describe('when called without start', () => {
            it('returns the hexes in a rectangle shape, starting at 0,0,0', () => {
                const hexCoordinates = grid.rectangle(2, 3).map(hex => hex.coordinates())
                expect(hexCoordinates).to.deep.include.members([
                    Hex(0, 0).coordinates(),
                    Hex(1, 0).coordinates(),
                    Hex(0, 1).coordinates(),
                    Hex(1, 1).coordinates(),
                    Hex(-1, 2).coordinates(),
                    Hex(0, 2).coordinates()
                ])
            })
        })

        describe('when called with start', () => {
            it('returns the hexes in a rectangle shape, starting at the given start', () => {
                const hexCoordinates = grid.rectangle(2, 3, [ -4, -2 ]).map(hex => hex.coordinates())
                expect(hexCoordinates).to.deep.include.members([
                    Hex(-4, -2).coordinates(),
                    Hex(-3, -2).coordinates(),
                    Hex(-4, -1).coordinates(),
                    Hex(-3, -1).coordinates(),
                    Hex(-5, 0).coordinates(),
                    Hex(-4, 0).coordinates()
                ])
            })
        })
    })
})
