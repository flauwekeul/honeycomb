import { expect } from 'chai'
import sinon from 'sinon'

import { is } from '../../src/utils'
import HexFactory from '../../src/hex'
import * as methods from '../../src/grid/methods'

const Hex = HexFactory()

before(() => sinon.spy(is, 'objectLiteral'))
after(() => is.objectLiteral.restore())

describe('pointToHex', () => {
    let Point, isPointy, hexResult, Hex, round, pointToHex, point

    beforeEach(() => {
        Point = sinon.stub().callsFake(point => point)
        isPointy = sinon.stub()
        hexResult = {
            size: 1,
            isPointy
        }
        Hex = sinon.stub().returns(hexResult)
        round = sinon.stub().returns('round result')
        Hex.round = round
        pointToHex = methods.pointToHexFactory({ Point, Hex })
        point = { x: 1, y: 1 }
    })

    it('calls Hex to access its size and isPointy', () => {
        pointToHex(point)
        expect(Hex).to.have.been.called
    })

    it('calls Point with the passed point to convert it to an actual point', () => {
        pointToHex(point)
        expect(Point).to.have.been.calledWith(point)
    })

    describe('when the hex has a pointy orientation', () => {
        beforeEach(() => isPointy.returns(true))

        it('creates a new hex', () => {
            pointToHex(point)
            expect(Hex.secondCall.args[0]).to.be.closeTo(0.2440, 0.0005)
            expect(Hex.secondCall.args[1]).to.be.closeTo(0.6667, 0.0005)
        })
    })

    describe('when the hex has a flat orientation', () => {
        beforeEach(() => isPointy.returns(false))

        it('creates a new hex', () => {
            pointToHex(point)
            expect(Hex.secondCall.args[0]).to.be.closeTo(0.6667, 0.0005)
            expect(Hex.secondCall.args[1]).to.be.closeTo(0.2440, 0.0005)
        })
    })

    it('rounds that hex', () => {
        pointToHex(point)
        expect(Hex.round).to.have.been.calledWith(hexResult)
    })

    it('returns the hex', () => {
        const result = pointToHex(point)
        expect(result).to.equal('round result')
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
    const isPointy = sinon.stub()
    const width = sinon.stub().returns(1)
    const Hex = sinon.stub().returns({ isPointy, width })
    const colSize = methods.colSizeFactory({ Hex })

    it('creates a hex', () => {
        colSize()
        expect(Hex).to.have.been.called
    })

    it('checks if the hex is pointy', () => {
        colSize()
        expect(isPointy).to.have.been.called
    })

    describe('when hexes are pointy', () => {
        before(() => isPointy.returns(true))

        it('returns the hex width', () => {
            const result = colSize()
            expect(width).to.have.been.called
            expect(result).to.equal(1)
        })
    })

    describe('when hexes are not pointy', () => {
        before(() => isPointy.returns(false))

        it('returns 3/4 of the hex width', () => {
            const result = colSize()
            expect(width).to.have.been.called
            expect(result).to.equal(0.75)
        })
    })
})

describe('rowSize', () => {
    const isPointy = sinon.stub()
    const height = sinon.stub().returns(1)
    const Hex = sinon.stub().returns({ isPointy, height })
    const rowSize = methods.rowSizeFactory({ Hex })

    it('creates a hex', () => {
        rowSize()
        expect(Hex).to.have.been.called
    })

    it('checks if the hex is pointy', () => {
        rowSize()
        expect(isPointy).to.have.been.called
    })

    describe('when hexes are pointy', () => {
        before(() => isPointy.returns(true))

        it('returns 3/4 of the hex height', () => {
            const result = rowSize()
            expect(height).to.have.been.called
            expect(result).to.equal(0.75)
        })
    })

    describe('when hexes are not pointy', () => {
        before(() => isPointy.returns(false))

        it('returns the hex height', () => {
            const result = rowSize()
            expect(height).to.have.been.called
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
            expect(parallelogram(2, 2)).to.deep.include.members([
                Hex(0, 0),
                Hex(1, 0),
                Hex(0, 1),
                Hex(1, 1)
            ])
        })
    })

    describe('when called with start hex', () => {
        it('returns the hexes in a parallelogram shape, starting at the given start hex', () => {
            expect(parallelogram(2, 2, Hex(5, 4))).to.deep.include.members([
                Hex(5, 4),
                Hex(6, 4),
                Hex(5, 5),
                Hex(6, 5)
            ])
        })
    })

    describe('when called with direction SE', () => {
        it('returns the hexes in a parallelogram shape, in a southeastern direction', () => {
            expect(parallelogram(2, 2, null, 'SE')).to.deep.include.members([
                Hex(0, 0),
                Hex(1, 0),
                Hex(0, 1),
                Hex(1, 1)
            ])
        })
    })

    describe('when called with direction N', () => {
        it('returns the hexes in a parallelogram shape, in a northern direction', () => {
            expect(parallelogram(2, 2, null, 'N')).to.deep.include.members([
                Hex(0, 0),
                Hex(1, -1),
                Hex(0, -1),
                Hex(1, -2)
            ])
        })
    })

    describe('when called with direction SW', () => {
        it('returns the hexes in a parallelogram shape, in a southwestern direction', () => {
            expect(parallelogram(2, 2, null, 'SW')).to.deep.include.members([
                Hex(0, 0),
                Hex(-1, 0),
                Hex(-1, 1),
                Hex(-2, 1)
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
            expect(triangle(2)).to.deep.include.members([
                Hex(0, 0),
                Hex(0, 1),
                Hex(1, 0)
            ])
        })
    })

    describe('when called with start hex', () => {
        it('returns the hexes in a triangle shape, starting at the given start hex', () => {
            expect(triangle(2, Hex(3, 6))).to.deep.include.members([
                Hex(3, 6),
                Hex(3, 7),
                Hex(4, 6)
            ])
        })
    })

    describe('when called with direction down', () => {
        it('returns the hexes in a triangle shape, pointing down', () => {
            expect(triangle(2, null, 'down')).to.deep.include.members([
                Hex(0, 0),
                Hex(0, 1),
                Hex(1, 0)
            ])
        })
    })

    describe('when called with direction up', () => {
        it('returns the hexes in a triangle shape, pointing up', () => {
            expect(triangle(2, null, 'up')).to.deep.include.members([
                Hex(0, 2),
                Hex(1, 1),
                Hex(1, 2)
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
            expect(hexagon(2)).to.deep.include.members([
                Hex(0, -1),
                Hex(1, -1),
                Hex(-1, 0),
                Hex(0, 0),
                Hex(1, 0),
                Hex(-1, 1),
                Hex(0, 1)
            ])
        })
    })

    describe('when called with start hex', () => {
        it('returns the hexes in a hexagon shape, with its center at the given center hex', () => {
            expect(hexagon(2, Hex(3, 1))).to.deep.include.members([
                Hex(3, 0),
                Hex(4, 0),
                Hex(2, 1),
                Hex(3, 1),
                Hex(4, 1),
                Hex(2, 2),
                Hex(3, 2)
            ])
        })
    })
})

describe('rectangle', () => {
    let rectangle, Hex

    before(() => rectangle = methods.rectangleFactory({ Hex: HexFactory(), is }))

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
        before(() => {
            Hex = HexFactory({ orientation: 'POINTY' })
            rectangle = methods.rectangleFactory({ Hex , is })
        })

        describe('when called without start hex or direction', () => {
            it('returns the hexes in a rectangle shape, starting at Hex(0)', () => {
                expect(rectangle(2, 3)).to.deep.include.members([
                    Hex(0, 0),
                    Hex(1, 0),
                    Hex(0, 1),
                    Hex(1, 1),
                    Hex(-1, 2),
                    Hex(0, 2)
                ])
            })
        })

        describe('when called with start hex', () => {
            it('returns the hexes in a rectangle shape, starting at the given start hex', () => {
                expect(rectangle(2, 3, Hex(-4, -2))).to.deep.include.members([
                    Hex(-4, -2),
                    Hex(-3, -2),
                    Hex(-4, -1),
                    Hex(-3, -1),
                    Hex(-5, 0),
                    Hex(-4, 0)
                ])
            })
        })

        describe('when called with direction E', () => {
            it('returns the hexes in a rectangle shape, in an eastern direction', () => {
                expect(rectangle(2, 2, null, 'E')).to.deep.include.members([
                    Hex(0, 0),
                    Hex(1, 0),
                    Hex(0, 1),
                    Hex(1, 1)
                ])
            })
        })

        describe('when called with direction NW', () => {
            it('returns the hexes in a rectangle shape, in an eastern direction', () => {
                expect(rectangle(2, 2, null, 'NW')).to.deep.include.members([
                    Hex(0, 0),
                    Hex(0, -1),
                    Hex(1, -1),
                    Hex(1, -2)
                ])
            })
        })

        describe('when called with direction SW', () => {
            it('returns the hexes in a rectangle shape, in an eastern direction', () => {
                expect(rectangle(2, 2, null, 'SW')).to.deep.include.members([
                    Hex(0, 0),
                    Hex(-1, 1),
                    Hex(-1, 0),
                    Hex(-2, 1)
                ])
            })
        })

        describe('when called with direction SE', () => {
            it('returns the hexes in a rectangle shape, in an eastern direction', () => {
                expect(rectangle(2, 2, null, 'SE')).to.deep.include.members([
                    Hex(0, 0),
                    Hex(0, 1),
                    Hex(1, 0),
                    Hex(1, 1)
                ])
            })
        })

        describe('when called with direction NE', () => {
            it('returns the hexes in a rectangle shape, in an eastern direction', () => {
                expect(rectangle(2, 2, null, 'NE')).to.deep.include.members([
                    Hex(0, 0),
                    Hex(1, -1),
                    Hex(0, -1),
                    Hex(1, -2)
                ])
            })
        })

        describe('when called with direction W', () => {
            it('returns the hexes in a rectangle shape, in an eastern direction', () => {
                expect(rectangle(2, 2, null, 'W')).to.deep.include.members([
                    Hex(0, 0),
                    Hex(-1, 0),
                    Hex(-1, 1),
                    Hex(-2, 1)
                ])
            })
        })
    })

    describe('when hexes have a flat orientation', () => {
        before(() => {
            Hex = HexFactory({ orientation: 'FLAT' })
            rectangle = methods.rectangleFactory({ Hex , is })
        })

        describe('when called without start hex or direction', () => {
            it('returns the hexes in a rectangle shape, starting at Hex(0)', () => {
                expect(rectangle(2, 3)).to.deep.include.members([
                    Hex(0, 0),
                    Hex(0, 1),
                    Hex(0, 2),
                    Hex(1, 0),
                    Hex(1, 1),
                    Hex(1, 2)
                ])
            })
        })

        describe('when called with start hex', () => {
            it('returns the hexes in a rectangle shape, starting at the given start hex', () => {
                expect(rectangle(2, 3, Hex(-4, -2))).to.deep.include.members([
                    Hex(-4, -2),
                    Hex(-4, -1),
                    Hex(-4, 0),
                    Hex(-3, -2),
                    Hex(-3, -1),
                    Hex(-3, 0)
                ])
            })
        })

        describe('when called with direction E', () => {
            it('returns the hexes in a rectangle shape, in an eastern direction', () => {
                expect(rectangle(2, 2, null, 'E')).to.deep.include.members([
                    Hex(0, 0),
                    Hex(1, 0),
                    Hex(0, 1),
                    Hex(1, 1)
                ])
            })
        })

        describe('when called with direction NW', () => {
            it('returns the hexes in a rectangle shape, in an eastern direction', () => {
                expect(rectangle(2, 2, null, 'NW')).to.deep.include.members([
                    Hex(0, 0),
                    Hex(0, -1),
                    Hex(1, -1),
                    Hex(1, -2)
                ])
            })
        })

        describe('when called with direction SW', () => {
            it('returns the hexes in a rectangle shape, in an eastern direction', () => {
                expect(rectangle(2, 2, null, 'SW')).to.deep.include.members([
                    Hex(0, 0),
                    Hex(-1, 1),
                    Hex(-1, 0),
                    Hex(-2, 1)
                ])
            })
        })

        describe('when called with direction SE', () => {
            it('returns the hexes in a rectangle shape, in an eastern direction', () => {
                expect(rectangle(2, 2, null, 'SE')).to.deep.include.members([
                    Hex(0, 0),
                    Hex(0, 1),
                    Hex(1, 0),
                    Hex(1, 1)
                ])
            })
        })

        describe('when called with direction NE', () => {
            it('returns the hexes in a rectangle shape, in an eastern direction', () => {
                expect(rectangle(2, 2, null, 'NE')).to.deep.include.members([
                    Hex(0, 0),
                    Hex(1, -1),
                    Hex(0, -1),
                    Hex(1, -2)
                ])
            })
        })

        describe('when called with direction W', () => {
            it('returns the hexes in a rectangle shape, in an eastern direction', () => {
                expect(rectangle(2, 2, null, 'W')).to.deep.include.members([
                    Hex(0, 0),
                    Hex(-1, 0),
                    Hex(-1, 1),
                    Hex(-2, 1)
                ])
            })
        })
    })
})
