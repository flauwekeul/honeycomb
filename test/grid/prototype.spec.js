import { expect } from 'chai'
import Grid from '../../src/grid'
import Hex from '../../src/hex'

describe('Grid prototype', () => {
    describe('colSize', () => {
        it('returns the size of the grid\'s columns', () => {
            const grid1 = Grid({ hex: { size: 20, orientation: 'pointy' } })
            expect(grid1.colSize()).to.be.closeTo(35, 0.5)
            const grid2 = Grid({ hex: { size: 20, orientation: 'flat' } })
            expect(grid2.colSize()).to.be.closeTo(30, 0.5)
        })
    })

    describe('rowSize', () => {
        it('returns the size of the grid\'s columns', () => {
            const grid1 = Grid({ hex: { size: 20, orientation: 'pointy' } })
            expect(grid1.rowSize()).to.be.closeTo(30, 0.5)
            const grid2 = Grid({ hex: { size: 20, orientation: 'flat' } })
            expect(grid2.rowSize()).to.be.closeTo(35, 0.5)
        })
    })

    describe('parallelogram', () => {
        const grid = Grid({ hex: { size: 20, orientation: 'pointy' } })

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
        const grid = Grid({ hex: { size: 20, orientation: 'pointy' } })

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
        const grid = Grid({ hex: { size: 20, orientation: 'pointy' } })

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
        const grid = Grid({ hex: { size: 20, orientation: 'pointy' } })

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
