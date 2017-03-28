import { expect } from 'chai'
import sinon from 'sinon'

import { is } from '../../src/utils'
import Hex from '../../src/hex'
import Point from '../../src/point'
import * as methods from '../../src/grid/methods'

before(() => {
    sinon.spy(is, 'objectLiteral')
    sinon.stub(Hex, 'isPointy')
})

after(() => {
    is.objectLiteral.restore()
    Hex.isPointy.restore()
})

describe('pointToHex', () => {
    it('converts a point to a hex by passing the passed point to Hex.fromPoint()', () => {
        sinon.spy(Hex, 'fromPoint')
        const pointToHex = methods.pointToHexFactory({ Hex })
        const point = Point()

        pointToHex(point)
        expect(Hex.fromPoint).to.have.been.calledWith(point)

        Hex.fromPoint.restore()
    })
})

describe('hexToPoint', () => {
    it('converts a hex to a point by calling the passed hex toPoint() method', () => {
        const hex = Hex()

        sinon.spy(hex, 'toPoint')

        methods.hexToPoint(hex)
        expect(hex.toPoint).to.have.been.called

        hex.toPoint.restore()
    })
})

describe('colSize', () => {
    let colSize

    before(() => {
        sinon.stub(Hex, 'width').returns(1)
        colSize = methods.colSizeFactory({ Hex })
    })

    after(() => Hex.width.restore())

    it('calls Hex.isPointy()', () => {
        colSize()
        expect(Hex.isPointy).to.have.been.called
    })

    describe('when hexes are pointy', () => {
        before(() => Hex.isPointy.returns(true))

        it('returns the hex width', () => {
            const result = colSize()
            expect(Hex.width).to.have.been.called
            expect(result).to.equal(1)
        })
    })

    describe('when hexes are not pointy', () => {
        before(() => Hex.isPointy.returns(false))

        it('returns 3/4 of the hex width', () => {
            const result = colSize()
            expect(Hex.width).to.have.been.called
            expect(result).to.equal(0.75)
        })
    })
})

describe('rowSize', () => {
    let rowSize

    before(() => {
        sinon.stub(Hex, 'height').returns(1)
        rowSize = methods.rowSizeFactory({ Hex })
    })

    after(() => {
        Hex.height.restore()
    })

    it('calls Hex.isPointy()', () => {
        rowSize()
        expect(Hex.isPointy).to.have.been.called
    })

    describe('when hexes are pointy', () => {
        before(() => Hex.isPointy.returns(true))

        it('returns 3/4 of the hex height', () => {
            const result = rowSize()
            expect(Hex.height).to.have.been.called
            expect(result).to.equal(0.75)
        })
    })

    describe('when hexes are not pointy', () => {
        before(() => Hex.isPointy.returns(false))

        it('returns the hex height', () => {
            const result = rowSize()
            expect(Hex.height).to.have.been.called
            expect(result).to.equal(1)
        })
    })
})

describe('parallelogram', () => {
    let parallelogram

    before(() => parallelogram = methods.parallelogramFactory({ Hex, is }))

    it('returns an array with a length of (width ⨉ height) hexes', () => {
        const result = parallelogram(2, 3)
        expect(result).to.be.an('array')
        expect(result).to.have.a.lengthOf(6)
    })

    describe('when an options object is passed', () => {
        it('calls is.objectLiteral', () => {
            const options = { some: 'options' }
            parallelogram(options)
            expect(is.objectLiteral).to.have.been.calledWith(options)
        })
    })

    describe('when called without start hex or direction', () => {
        it('returns the hexes in a parallelogram shape, starting at Hex(0)', () => {
            const hexCoordinates = parallelogram(2, 2).map(hex => hex.coordinates())
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
            const hexCoordinates = parallelogram(2, 2, Hex(5, 4)).map(hex => hex.coordinates())
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
            const hexCoordinates = parallelogram(2, 2, null, 'SE').map(hex => hex.coordinates())
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
            const hexCoordinates = parallelogram(2, 2, null, 'N').map(hex => hex.coordinates())
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
            const hexCoordinates = parallelogram(2, 2, null, 'SW').map(hex => hex.coordinates())
            expect(hexCoordinates).to.deep.include.members([
                Hex(0, 0).coordinates(),
                Hex(-1, 0).coordinates(),
                Hex(-1, 1).coordinates(),
                Hex(-2, 1).coordinates()
            ])
        })
    })
})

describe('triangle', () => {
    let triangle

    before(() => triangle = methods.triangleFactory({ Hex, is }))

    // https://en.wikipedia.org/wiki/Triangular_number
    it('returns an array with a length of the triangle number of the side', () => {
        const result = triangle(4)
        expect(result).to.be.an('array')
        expect(result).to.have.a.lengthOf(10)
    })

    describe('when an options object is passed', () => {
        it('calls is.objectLiteral', () => {
            const options = { some: 'options' }
            triangle(options)
            expect(is.objectLiteral).to.have.been.calledWith(options)
        })
    })

    describe('when called without start hex or direction', () => {
        it('returns the hexes in a triangle shape, starting at Hex(0)', () => {
            const hexCoordinates = triangle(2).map(hex => hex.coordinates())
            expect(hexCoordinates).to.deep.include.members([
                Hex(0, 0).coordinates(),
                Hex(0, 1).coordinates(),
                Hex(1, 0).coordinates()
            ])
        })
    })

    describe('when called with start hex', () => {
        it('returns the hexes in a triangle shape, starting at the given start hex', () => {
            const hexCoordinates = triangle(2, Hex(3, 6)).map(hex => hex.coordinates())
            expect(hexCoordinates).to.deep.include.members([
                Hex(3, 6).coordinates(),
                Hex(3, 7).coordinates(),
                Hex(4, 6).coordinates()
            ])
        })
    })

    describe('when called with direction down', () => {
        it('returns the hexes in a triangle shape, pointing down', () => {
            const hexCoordinates = triangle(2, null, 'down').map(hex => hex.coordinates())
            expect(hexCoordinates).to.deep.include.members([
                Hex(0, 0).coordinates(),
                Hex(0, 1).coordinates(),
                Hex(1, 0).coordinates()
            ])
        })
    })

    describe('when called with direction up', () => {
        it('returns the hexes in a triangle shape, pointing up', () => {
            const hexCoordinates = triangle(2, null, 'up').map(hex => hex.coordinates())
            expect(hexCoordinates).to.deep.include.members([
                Hex(0, 2).coordinates(),
                Hex(1, 1).coordinates(),
                Hex(1, 2).coordinates()
            ])
        })
    })
})

describe('hexagon', () => {
    let hexagon

    before(() => hexagon = methods.hexagonFactory({ Hex, is }))

    it('returns an array with a hard to determine amount of hexes 😬', () => {
        const result = hexagon(4)
        expect(result).to.be.an('array')
        expect(result).to.have.a.lengthOf(37)
    })

    describe('when an options object is passed', () => {
        it('calls is.objectLiteral', () => {
            const options = { some: 'options' }
            hexagon(options)
            expect(is.objectLiteral).to.have.been.calledWith(options)
        })
    })

    describe('when called without start hex', () => {
        it('returns the hexes in a hexagon shape, with its center at Hex(0)', () => {
            const hexCoordinates = hexagon(2).map(hex => hex.coordinates())
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
            const hexCoordinates = hexagon(2, Hex(3, 1)).map(hex => hex.coordinates())
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
    let rectangle

    before(() => rectangle = methods.rectangleFactory({ Hex, is }))

    it('returns an array with a length of (width ⨉ height) hexes', () => {
        const result = rectangle(4, 5)
        expect(result).to.be.an('array')
        expect(result).to.have.a.lengthOf(20)
    })

    describe('when an options object is passed', () => {
        it('calls is.objectLiteral', () => {
            const options = { some: 'options' }
            rectangle(options)
            expect(is.objectLiteral).to.have.been.calledWith(options)
        })
    })

    describe('when hexes have a pointy orientation', () => {
        before(() => Hex.isPointy.returns(true))

        describe('when called without start hex or direction', () => {
            it('returns the hexes in a rectangle shape, starting at Hex(0)', () => {
                const hexCoordinates = rectangle(2, 3).map(hex => hex.coordinates())
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
                const hexCoordinates = rectangle(2, 3, Hex(-4, -2)).map(hex => hex.coordinates())
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
                const hexCoordinates = rectangle(2, 2, null, 'E').map(hex => hex.coordinates())
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
                const hexCoordinates = rectangle(2, 2, null, 'NW').map(hex => hex.coordinates())
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
                const hexCoordinates = rectangle(2, 2, null, 'SW').map(hex => hex.coordinates())
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
                const hexCoordinates = rectangle(2, 2, null, 'SE').map(hex => hex.coordinates())
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
                const hexCoordinates = rectangle(2, 2, null, 'NE').map(hex => hex.coordinates())
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
                const hexCoordinates = rectangle(2, 2, null, 'W').map(hex => hex.coordinates())
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
        before(() => Hex.isPointy.returns(false))

        describe('when called without start hex or direction', () => {
            it('returns the hexes in a rectangle shape, starting at Hex(0)', () => {
                const hexCoordinates = rectangle(2, 3).map(hex => hex.coordinates())
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
                const hexCoordinates = rectangle(2, 3, Hex(-4, -2)).map(hex => hex.coordinates())
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
                const hexCoordinates = rectangle(2, 2, null, 'E').map(hex => hex.coordinates())
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
                const hexCoordinates = rectangle(2, 2, null, 'NW').map(hex => hex.coordinates())
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
                const hexCoordinates = rectangle(2, 2, null, 'SW').map(hex => hex.coordinates())
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
                const hexCoordinates = rectangle(2, 2, null, 'SE').map(hex => hex.coordinates())
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
                const hexCoordinates = rectangle(2, 2, null, 'NE').map(hex => hex.coordinates())
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
                const hexCoordinates = rectangle(2, 2, null, 'W').map(hex => hex.coordinates())
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
