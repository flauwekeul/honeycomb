import { expect } from 'chai'
import sinon from 'sinon'

import Hex from '../../src/hex'
import Point from '../../src/point'
import Grid from '../../src/grid'

let grid

describe('Grid methods', () => {
    describe('pointToHex', () => {
        it('converts a point to a hex by passing the passed point to Hex.fromPoint()', () => {
            const point = Point()
            const grid = Grid({ hex: {} })

            sinon.spy(Hex, 'fromPoint')

            grid.pointToHex(point)
            expect(Hex.fromPoint).to.have.been.calledWith(point)

            Hex.fromPoint.restore()
        })
    })

    describe('hexToPoint', () => {
        it('converts a hex to a point by calling the passed hex toPoint() method', () => {
            const hex = Hex()
            const grid = Grid({ hex: {} })

            sinon.spy(hex, 'toPoint')

            grid.hexToPoint(hex)
            expect(hex.toPoint).to.have.been.called

            hex.toPoint.restore()
        })
    })

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
        describe('when passed an options object', () => {
            it('works', () => {
                grid = Grid({ hex: { size: 20, orientation: 'pointy' } })
                const hexCoordinates = grid.parallelogram({
                    width: 2,
                    height: 2,
                    start: Hex(5, 4),
                    direction: 'SW'
                }).map(hex => hex.coordinates())
                expect(hexCoordinates).to.deep.include.members([
                    Hex(5, 4).coordinates(),
                    Hex(4, 4).coordinates(),
                    Hex(4, 5).coordinates(),
                    Hex(3, 5).coordinates()
                ])
            })
        })

        describe('when hexes have a pointy orientation', () => {
            before(() => {
                grid = Grid({ hex: { size: 20, orientation: 'pointy' } })
            })

            describe('when called without start hex or direction', () => {
                it('returns the hexes in a parallelogram shape, starting at Hex(0)', () => {
                    const hexCoordinates = grid.parallelogram(2, 2).map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(1, 0).coordinates(),
                        Hex(0, 1).coordinates(),
                        Hex(1, 1).coordinates()
                    ])
                })
            })

            describe('when called with start hex', () => {
                it('returns the hexes in a parallelogram shape, starting at the given start hex', () => {
                    const hexCoordinates = grid.parallelogram(2, 2, Hex(5, 4)).map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(5, 4).coordinates(),
                        Hex(6, 4).coordinates(),
                        Hex(5, 5).coordinates(),
                        Hex(6, 5).coordinates()
                    ])
                })
            })

            describe('when called with direction SE', () => {
                it('returns the hexes in a parallelogram shape, in a southeastern direction', () => {
                    const hexCoordinates = grid.parallelogram(2, 2, null, 'SE').map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(1, 0).coordinates(),
                        Hex(0, 1).coordinates(),
                        Hex(1, 1).coordinates()
                    ])
                })
            })

            describe('when called with direction N', () => {
                it('returns the hexes in a parallelogram shape, in a northern direction', () => {
                    const hexCoordinates = grid.parallelogram(2, 2, null, 'N').map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(1, -1).coordinates(),
                        Hex(0, -1).coordinates(),
                        Hex(1, -2).coordinates()
                    ])
                })
            })

            describe('when called with direction SW', () => {
                it('returns the hexes in a parallelogram shape, in a southwestern direction', () => {
                    const hexCoordinates = grid.parallelogram(2, 2, null, 'SW').map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(-1, 0).coordinates(),
                        Hex(-1, 1).coordinates(),
                        Hex(-2, 1).coordinates()
                    ])
                })
            })
        })

        describe('when hexes have a flat orientation', () => {
            before(() => {
                grid = Grid({ hex: { size: 20, orientation: 'flat' } })
            })

            describe('when called without start hex or direction', () => {
                it('returns the hexes in a parallelogram shape, starting at Hex(0)', () => {
                    const hexCoordinates = grid.parallelogram(2, 2).map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(1, 0).coordinates(),
                        Hex(0, 1).coordinates(),
                        Hex(1, 1).coordinates()
                    ])
                })
            })

            describe('when called with start hex', () => {
                it('returns the hexes in a parallelogram shape, starting at the given start hex', () => {
                    const hexCoordinates = grid.parallelogram(2, 2, Hex(5, 4)).map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(5, 4).coordinates(),
                        Hex(6, 4).coordinates(),
                        Hex(5, 5).coordinates(),
                        Hex(6, 5).coordinates()
                    ])
                })
            })

            describe('when called with direction SE', () => {
                it('returns the hexes in a parallelogram shape, in a southeastern direction', () => {
                    const hexCoordinates = grid.parallelogram(2, 2, null, 'SE').map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(1, 0).coordinates(),
                        Hex(0, 1).coordinates(),
                        Hex(1, 1).coordinates()
                    ])
                })
            })

            describe('when called with direction N', () => {
                it('returns the hexes in a parallelogram shape, in a northern direction', () => {
                    const hexCoordinates = grid.parallelogram(2, 2, null, 'N').map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(1, -1).coordinates(),
                        Hex(0, -1).coordinates(),
                        Hex(1, -2).coordinates()
                    ])
                })
            })

            describe('when called with direction SW', () => {
                it('returns the hexes in a parallelogram shape, in a southwestern direction', () => {
                    const hexCoordinates = grid.parallelogram(2, 2, null, 'SW').map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(-1, 0).coordinates(),
                        Hex(-1, 1).coordinates(),
                        Hex(-2, 1).coordinates()
                    ])
                })
            })
        })
    })

    describe('triangle', () => {
        describe('when passed an options object', () => {
            it('works', () => {
                grid = Grid({ hex: { size: 20, orientation: 'pointy' } })
                const hexCoordinates = grid.triangle({
                    side: 2,
                    start: Hex(5, 4),
                    direction: 'up'
                }).map(hex => hex.coordinates())
                expect(hexCoordinates).to.deep.include.members([
                    Hex(5, 6).coordinates(),
                    Hex(6, 5).coordinates(),
                    Hex(6, 6).coordinates()
                ])
            })
        })

        describe('when hexes have a pointy orientation', () => {
            before(() => {
                grid = Grid({ hex: { size: 20, orientation: 'pointy' } })
            })

            describe('when called without start hex or direction', () => {
                it('returns the hexes in a triangle shape, starting at Hex(0)', () => {
                    const hexCoordinates = grid.triangle(2).map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(0, 1).coordinates(),
                        Hex(1, 0).coordinates()
                    ])
                })
            })

            describe('when called with start hex', () => {
                it('returns the hexes in a triangle shape, starting at the given start hex', () => {
                    const hexCoordinates = grid.triangle(2, Hex(3, 6)).map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(3, 6).coordinates(),
                        Hex(3, 7).coordinates(),
                        Hex(4, 6).coordinates()
                    ])
                })
            })

            describe('when called with direction down', () => {
                it('returns the hexes in a triangle shape, pointing down', () => {
                    const hexCoordinates = grid.triangle(2, null, 'down').map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(0, 1).coordinates(),
                        Hex(1, 0).coordinates()
                    ])
                })
            })

            describe('when called with direction up', () => {
                it('returns the hexes in a triangle shape, pointing up', () => {
                    const hexCoordinates = grid.triangle(2, null, 'up').map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 2).coordinates(),
                        Hex(1, 1).coordinates(),
                        Hex(1, 2).coordinates()
                    ])
                })
            })
        })

        describe('when hexes have a flat orientation', () => {
            before(() => {
                grid = Grid({ hex: { size: 20, orientation: 'flat' } })
            })

            describe('when called without start hex or direction', () => {
                it('returns the hexes in a triangle shape, starting at Hex(0)', () => {
                    const hexCoordinates = grid.triangle(2).map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(0, 1).coordinates(),
                        Hex(1, 0).coordinates()
                    ])
                })
            })

            describe('when called with start hex', () => {
                it('returns the hexes in a triangle shape, starting at the given start hex', () => {
                    const hexCoordinates = grid.triangle(2, Hex(3, 6)).map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(3, 6).coordinates(),
                        Hex(3, 7).coordinates(),
                        Hex(4, 6).coordinates()
                    ])
                })
            })

            describe('when called with direction down', () => {
                it('returns the hexes in a triangle shape, pointing down', () => {
                    const hexCoordinates = grid.triangle(2, null, 'down').map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(0, 1).coordinates(),
                        Hex(1, 0).coordinates()
                    ])
                })
            })

            describe('when called with direction up', () => {
                it('returns the hexes in a triangle shape, pointing up', () => {
                    const hexCoordinates = grid.triangle(2, null, 'up').map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 2).coordinates(),
                        Hex(1, 1).coordinates(),
                        Hex(1, 2).coordinates()
                    ])
                })
            })
        })
    })

    describe('hexagon', () => {
        describe('when passed an options object', () => {
            it('works', () => {
                grid = Grid({ hex: { size: 20, orientation: 'pointy' } })
                const hexCoordinates = grid.hexagon({
                    radius: 2,
                    center: Hex(5, 4)
                }).map(hex => hex.coordinates())
                expect(hexCoordinates).to.deep.include.members([
                    Hex(5, 3).coordinates(),
                    Hex(6, 3).coordinates(),
                    Hex(4, 4).coordinates(),
                    Hex(5, 4).coordinates(),
                    Hex(6, 4).coordinates(),
                    Hex(4, 5).coordinates(),
                    Hex(5, 5).coordinates()
                ])
            })
        })

        describe('when hexes have a pointy orientation', () => {
            before(() => {
                grid = Grid({ hex: { size: 20, orientation: 'pointy' } })
            })

            describe('when called without start hex', () => {
                it('returns the hexes in a hexagon shape, with its center at Hex(0)', () => {
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

            describe('when called with start hex', () => {
                it('returns the hexes in a hexagon shape, with its center at the given center hex', () => {
                    const hexCoordinates = grid.hexagon(2, Hex(3, 1)).map(hex => hex.coordinates())
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

        describe('when hexes have a flat orientation', () => {
            before(() => {
                grid = Grid({ hex: { size: 20, orientation: 'flat' } })
            })

            describe('when called without start hex', () => {
                it('returns the hexes in a hexagon shape, with its center at Hex(0)', () => {
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

            describe('when called with start hex', () => {
                it('returns the hexes in a hexagon shape, with its center at the given center hex', () => {
                    const hexCoordinates = grid.hexagon(2, Hex(3, 1)).map(hex => hex.coordinates())
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
    })

    describe('rectangle', () => {
        describe('when passed an options object', () => {
            it('works', () => {
                grid = Grid({ hex: { size: 20, orientation: 'pointy' } })
                const hexCoordinates = grid.rectangle({
                    width: 2,
                    height: 2,
                    start: Hex(5, 4),
                    direction: 'W'
                }).map(hex => hex.coordinates())
                expect(hexCoordinates).to.deep.include.members([
                    Hex(5, 4).coordinates(),
                    Hex(4, 4).coordinates(),
                    Hex(4, 5).coordinates(),
                    Hex(3, 5).coordinates()
                ])
            })
        })

        describe('when hexes have a pointy orientation', () => {
            before(() => {
                grid = Grid({ hex: { size: 20, orientation: 'pointy' } })
            })

            describe('when called without start hex or direction', () => {
                it('returns the hexes in a rectangle shape, starting at Hex(0)', () => {
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

            describe('when called with start hex', () => {
                it('returns the hexes in a rectangle shape, starting at the given start hex', () => {
                    const hexCoordinates = grid.rectangle(2, 3, Hex(-4, -2)).map(hex => hex.coordinates())
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

            describe('when called with direction E', () => {
                it('returns the hexes in a rectangle shape, in an eastern direction', () => {
                    const hexCoordinates = grid.rectangle(2, 2, null, 'E').map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(1, 0).coordinates(),
                        Hex(0, 1).coordinates(),
                        Hex(1, 1).coordinates()
                    ])
                })
            })

            describe('when called with direction NW', () => {
                it('returns the hexes in a rectangle shape, in an eastern direction', () => {
                    const hexCoordinates = grid.rectangle(2, 2, null, 'NW').map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(0, -1).coordinates(),
                        Hex(1, -1).coordinates(),
                        Hex(1, -2).coordinates()
                    ])
                })
            })

            describe('when called with direction SW', () => {
                it('returns the hexes in a rectangle shape, in an eastern direction', () => {
                    const hexCoordinates = grid.rectangle(2, 2, null, 'SW').map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(-1, 1).coordinates(),
                        Hex(-1, 0).coordinates(),
                        Hex(-2, 1).coordinates()
                    ])
                })
            })

            describe('when called with direction SE', () => {
                it('returns the hexes in a rectangle shape, in an eastern direction', () => {
                    const hexCoordinates = grid.rectangle(2, 2, null, 'SE').map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(0, 1).coordinates(),
                        Hex(1, 0).coordinates(),
                        Hex(1, 1).coordinates()
                    ])
                })
            })

            describe('when called with direction NE', () => {
                it('returns the hexes in a rectangle shape, in an eastern direction', () => {
                    const hexCoordinates = grid.rectangle(2, 2, null, 'NE').map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(1, -1).coordinates(),
                        Hex(0, -1).coordinates(),
                        Hex(1, -2).coordinates()
                    ])
                })
            })

            describe('when called with direction W', () => {
                it('returns the hexes in a rectangle shape, in an eastern direction', () => {
                    const hexCoordinates = grid.rectangle(2, 2, null, 'W').map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(-1, 0).coordinates(),
                        Hex(-1, 1).coordinates(),
                        Hex(-2, 1).coordinates()
                    ])
                })
            })
        })

        describe('when hexes have a flat orientation', () => {
            before(() => {
                grid = Grid({ hex: { size: 20, orientation: 'flat' } })
            })

            describe('when called without start hex or direction', () => {
                it('returns the hexes in a rectangle shape, starting at Hex(0)', () => {
                    const hexCoordinates = grid.rectangle(2, 3).map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(0, 1).coordinates(),
                        Hex(0, 2).coordinates(),
                        Hex(1, 0).coordinates(),
                        Hex(1, 1).coordinates(),
                        Hex(1, 2).coordinates()
                    ])
                })
            })

            describe('when called with start hex', () => {
                it('returns the hexes in a rectangle shape, starting at the given start hex', () => {
                    const hexCoordinates = grid.rectangle(2, 3, Hex(-4, -2)).map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(-4, -2).coordinates(),
                        Hex(-4, -1).coordinates(),
                        Hex(-4, 0).coordinates(),
                        Hex(-3, -2).coordinates(),
                        Hex(-3, -1).coordinates(),
                        Hex(-3, 0).coordinates()
                    ])
                })
            })

            describe('when called with direction E', () => {
                it('returns the hexes in a rectangle shape, in an eastern direction', () => {
                    const hexCoordinates = grid.rectangle(2, 2, null, 'E').map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(1, 0).coordinates(),
                        Hex(0, 1).coordinates(),
                        Hex(1, 1).coordinates()
                    ])
                })
            })

            describe('when called with direction NW', () => {
                it('returns the hexes in a rectangle shape, in an eastern direction', () => {
                    const hexCoordinates = grid.rectangle(2, 2, null, 'NW').map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(0, -1).coordinates(),
                        Hex(1, -1).coordinates(),
                        Hex(1, -2).coordinates()
                    ])
                })
            })

            describe('when called with direction SW', () => {
                it('returns the hexes in a rectangle shape, in an eastern direction', () => {
                    const hexCoordinates = grid.rectangle(2, 2, null, 'SW').map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(-1, 1).coordinates(),
                        Hex(-1, 0).coordinates(),
                        Hex(-2, 1).coordinates()
                    ])
                })
            })

            describe('when called with direction SE', () => {
                it('returns the hexes in a rectangle shape, in an eastern direction', () => {
                    const hexCoordinates = grid.rectangle(2, 2, null, 'SE').map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(0, 1).coordinates(),
                        Hex(1, 0).coordinates(),
                        Hex(1, 1).coordinates()
                    ])
                })
            })

            describe('when called with direction NE', () => {
                it('returns the hexes in a rectangle shape, in an eastern direction', () => {
                    const hexCoordinates = grid.rectangle(2, 2, null, 'NE').map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(1, -1).coordinates(),
                        Hex(0, -1).coordinates(),
                        Hex(1, -2).coordinates()
                    ])
                })
            })

            describe('when called with direction W', () => {
                it('returns the hexes in a rectangle shape, in an eastern direction', () => {
                    const hexCoordinates = grid.rectangle(2, 2, null, 'W').map(hex => hex.coordinates())
                    expect(hexCoordinates).to.deep.include.members([
                        Hex(0, 0).coordinates(),
                        Hex(-1, 0).coordinates(),
                        Hex(-1, 1).coordinates(),
                        Hex(-2, 1).coordinates()
                    ])
                })
            })
        })
    })
})
