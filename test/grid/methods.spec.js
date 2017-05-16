import { expect } from 'chai'
import sinon from 'sinon'

import { is } from '../../src/utils'
import HexFactory from '../../src/hex'
import * as methods from '../../src/grid/methods'

const Hex = HexFactory()

before(function() {
    sinon.spy(is, 'objectLiteral')
})
after(function() {
    is.objectLiteral.restore()
})

describe('pointToHex', function() {
    let Point, isPointy, hexResult, Hex, round, pointToHex, point

    beforeEach(function() {
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

    it('calls Hex to access its size and isPointy', function() {
        pointToHex(point)
        expect(Hex).to.have.been.called
    })

    it('calls Point with the passed point to convert it to an actual point', function() {
        pointToHex(point)
        expect(Point).to.have.been.calledWith(point)
    })

    describe('when the hex has a pointy orientation', function() {
        beforeEach(function() {
            isPointy.returns(true)
        })

        it('creates a new hex', function() {
            pointToHex(point)
            expect(Hex.secondCall.args[0]).to.be.closeTo(0.2440, 0.0005)
            expect(Hex.secondCall.args[1]).to.be.closeTo(0.6667, 0.0005)
        })
    })

    describe('when the hex has a flat orientation', function() {
        beforeEach(function() {
            isPointy.returns(false)
        })

        it('creates a new hex', function() {
            pointToHex(point)
            expect(Hex.secondCall.args[0]).to.be.closeTo(0.6667, 0.0005)
            expect(Hex.secondCall.args[1]).to.be.closeTo(0.2440, 0.0005)
        })
    })

    it('rounds that hex', function() {
        pointToHex(point)
        expect(Hex.round).to.have.been.calledWith(hexResult)
    })

    it('returns the hex', function() {
        const result = pointToHex(point)
        expect(result).to.equal('round result')
    })
})

describe('hexToPoint', function() {
    it('converts a hex to a point by calling the passed hex toPoint() method', function() {
        const hex = Hex()

        sinon.spy(hex, 'toPoint')

        methods.hexToPoint(hex)
        expect(hex.toPoint).to.have.been.called

        hex.toPoint.restore()
    })
})

describe('colSize', function() {
    const isPointy = sinon.stub()
    const width = sinon.stub().returns(1)
    const Hex = sinon.stub().returns({ isPointy, width })
    const colSize = methods.colSizeFactory({ Hex })

    it('creates a hex', function() {
        colSize()
        expect(Hex).to.have.been.called
    })

    it('checks if the hex is pointy', function() {
        colSize()
        expect(isPointy).to.have.been.called
    })

    describe('when hexes are pointy', function() {
        before(function() {
            isPointy.returns(true)
        })

        it('returns the hex width', function() {
            const result = colSize()
            expect(width).to.have.been.called
            expect(result).to.equal(1)
        })
    })

    describe('when hexes are not pointy', function() {
        before(function() {
            isPointy.returns(false)
        })

        it('returns 3/4 of the hex width', function() {
            const result = colSize()
            expect(width).to.have.been.called
            expect(result).to.equal(0.75)
        })
    })
})

describe('rowSize', function() {
    const isPointy = sinon.stub()
    const height = sinon.stub().returns(1)
    const Hex = sinon.stub().returns({ isPointy, height })
    const rowSize = methods.rowSizeFactory({ Hex })

    it('creates a hex', function() {
        rowSize()
        expect(Hex).to.have.been.called
    })

    it('checks if the hex is pointy', function() {
        rowSize()
        expect(isPointy).to.have.been.called
    })

    describe('when hexes are pointy', function() {
        before(function() {
            isPointy.returns(true)
        })

        it('returns 3/4 of the hex height', function() {
            const result = rowSize()
            expect(height).to.have.been.called
            expect(result).to.equal(0.75)
        })
    })

    describe('when hexes are not pointy', function() {
        before(function() {
            isPointy.returns(false)
        })

        it('returns the hex height', function() {
            const result = rowSize()
            expect(height).to.have.been.called
            expect(result).to.equal(1)
        })
    })
})

describe('parallelogram', function() {
    let parallelogram

    before(function() {
        parallelogram = methods.parallelogramFactory({ Hex, is })
    })

    it('returns an array with a length of (width ⨉ height) hexes', function() {
        const result = parallelogram(2, 3)
        expect(result).to.be.an('array')
        expect(result).to.have.a.lengthOf(6)
    })

    describe('when an options object is passed', function() {
        it('calls is.objectLiteral', function() {
            const options = { some: 'options' }
            parallelogram(options)
            expect(is.objectLiteral).to.have.been.calledWith(options)
        })
    })

    describe('when called without start hex or direction', function() {
        it('returns the hexes in a parallelogram shape, starting at Hex(0)', function() {
            const coordinates = parallelogram(2, 2).map(hex => hex.coordinates())
            expect(coordinates).to.deep.include.members([
                { x: 0, y: 0, z: 0 },
                { x: 1, y: 0, z: -1 },
                { x: 0, y: 1, z: -1 },
                { x: 1, y: 1, z: -2 }
            ])
        })
    })

    describe('when called with start hex', function() {
        it('returns the hexes in a parallelogram shape, starting at the given start hex', function() {
            const coordinates = parallelogram(2, 2, Hex(5, 4)).map(hex => hex.coordinates())
            expect(coordinates).to.deep.include.members([
                { x: 5, y: 4, z: -9 },
                { x: 6, y: 4, z: -10 },
                { x: 5, y: 5, z: -10 },
                { x: 6, y: 5, z: -11 }
            ])
        })
    })

    describe('when called with direction 1', function() {
        it('returns the hexes in a parallelogram shape, in a southeastern direction', function() {
            const coordinates = parallelogram(2, 2, null, 1).map(hex => hex.coordinates())
            expect(coordinates).to.deep.include.members([
                { x: 0, y: 0, z: 0 },
                { x: 1, y: 0, z: -1 },
                { x: 0, y: 1, z: -1 },
                { x: 1, y: 1, z: -2 }
            ])
        })
    })

    describe('when called with direction 3', function() {
        it('returns the hexes in a parallelogram shape, in a southwestern direction', function() {
            const coordinates = parallelogram(2, 2, null, 3).map(hex => hex.coordinates())
            expect(coordinates).to.deep.include.members([
                { x: 0, y: 0, z: 0 },
                { x: -1, y: 0, z: 1 },
                { x: -1, y: 1, z: 0 },
                { x: -2, y: 1, z: 1 }
            ])
        })
    })

    describe('when called with direction 5', function() {
        it('returns the hexes in a parallelogram shape, in a northern direction', function() {
            const coordinates = parallelogram(2, 2, null, 5).map(hex => hex.coordinates())
            expect(coordinates).to.deep.include.members([
                { x: 0, y: 0, z: 0 },
                { x: 1, y: -1, z: 0 },
                { x: 0, y: -1, z: 1 },
                { x: 1, y: -2, z: 1 }
            ])
        })
    })
})

describe('triangle', function() {
    let triangle

    before(function() {
        triangle = methods.triangleFactory({ Hex, is })
    })

    // https://en.wikipedia.org/wiki/Triangular_number
    it('returns an array with a length of the triangle number of the side', function() {
        const result = triangle(4)
        expect(result).to.be.an('array')
        expect(result).to.have.a.lengthOf(4+3+2+1)
    })

    describe('when an options object is passed', function() {
        it('calls is.objectLiteral', function() {
            const options = { some: 'options' }
            triangle(options)
            expect(is.objectLiteral).to.have.been.calledWith(options)
        })
    })

    describe('when called without start hex or direction', function() {
        it('returns the hexes in a triangle shape, starting at Hex(0)', function() {
            const coordinates = triangle(2).map(hex => hex.coordinates())
            expect(coordinates).to.deep.include.members([
                { x: 0, y: 0, z: 0 },
                { x: 0, y: 1, z: -1 },
                { x: 1, y: 0, z: -1 }
            ])
        })
    })

    describe('when called with start hex', function() {
        it('returns the hexes in a triangle shape, starting at the given start hex', function() {
            const coordinates = triangle(2, Hex(3, 6)).map(hex => hex.coordinates())
            expect(coordinates).to.deep.include.members([
                { x: 3, y: 6, z: -9 },
                { x: 3, y: 7, z: -10 },
                { x: 4, y: 6, z: -10 }
            ])
        })
    })

    describe('when called with direction 1', function() {
        it('returns the hexes in a triangle shape, pointing down', function() {
            const coordinates = triangle(2, null, 1).map(hex => hex.coordinates())
            expect(coordinates).to.deep.include.members([
                { x: 0, y: 0, z: 0 },
                { x: 0, y: 1, z: -1 },
                { x: 1, y: 0, z: -1 }
            ])
        })
    })

    describe('when called with direction 5', function() {
        it('returns the hexes in a triangle shape, pointing up', function() {
            const coordinates = triangle(2, null, 5).map(hex => hex.coordinates())
            expect(coordinates).to.deep.include.members([
                { x: 0, y: 2, z: -2 },
                { x: 1, y: 1, z: -2 },
                { x: 1, y: 2, z: -3 }
            ])
        })
    })
})

describe('hexagon', function() {
    let hexagon

    before(function() {
        hexagon = methods.hexagonFactory({ Hex, is })
    })

    it('returns an array with a hard to determine amount of hexes 😬', function() {
        const result = hexagon(4)
        expect(result).to.be.an('array')
        expect(result).to.have.a.lengthOf(37)
    })

    describe('when an options object is passed', function() {
        it('calls is.objectLiteral', function() {
            const options = { some: 'options' }
            hexagon(options)
            expect(is.objectLiteral).to.have.been.calledWith(options)
        })
    })

    describe('when called without start hex', function() {
        it('returns the hexes in a hexagon shape, with its center at Hex(0)', function() {
            const coordinates = hexagon(2).map(hex => hex.coordinates())
            expect(coordinates).to.deep.include.members([
                { x: 0, y: -1, z: 1 },
                { x: 1, y: -1, z: 0 },
                { x: -1, y: 0, z: 1 },
                { x: 0, y: 0, z: 0 },
                { x: 1, y: 0, z: -1 },
                { x: -1, y: 1, z: 0 },
                { x: 0, y: 1, z: -1 }
            ])
        })
    })

    describe('when called with start hex', function() {
        it('returns the hexes in a hexagon shape, with its center at the given center hex', function() {
            const coordinates = hexagon(2, Hex(3, 1)).map(hex => hex.coordinates())
            expect(coordinates).to.deep.include.members([
                { x: 3, y: 0, z: -3 },
                { x: 4, y: 0, z: -4 },
                { x: 2, y: 1, z: -3 },
                { x: 3, y: 1, z: -4 },
                { x: 4, y: 1, z: -5 },
                { x: 2, y: 2, z: -4 },
                { x: 3, y: 2, z: -5 }
            ])
        })
    })
})

describe('rectangle', function() {
    let rectangle, Hex

    before(function() {
        rectangle = methods.rectangleFactory({ Hex: HexFactory(), is })
    })

    it('returns an array with a length of (width ⨉ height) hexes', function() {
        const result = rectangle(4, 5)
        expect(result).to.be.an('array')
        expect(result).to.have.a.lengthOf(20)
    })

    describe('when an options object is passed', function() {
        it('calls is.objectLiteral', function() {
            const options = { some: 'options' }
            rectangle(options)
            expect(is.objectLiteral).to.have.been.calledWith(options)
        })
    })

    describe('when hexes have a pointy orientation', function() {
        before(function() {
            Hex = HexFactory({ orientation: 'POINTY' })
            rectangle = methods.rectangleFactory({ Hex , is })
        })

        describe('when called without start hex or direction', function() {
            it('returns the hexes in a rectangle shape, starting at Hex(0)', function() {
                const coordinates = rectangle(2, 3).map(hex => hex.coordinates())
                expect(coordinates).to.deep.include.members([
                    { x: 0, y: 0, z: 0 },
                    { x: 1, y: 0, z: -1 },
                    { x: 0, y: 1, z: -1 },
                    { x: 1, y: 1, z: -2 },
                    { x: -1, y: 2, z: -1 },
                    { x: 0, y: 2, z: -2 }
                ])
            })
        })

        describe('when called with start hex', function() {
            it('returns the hexes in a rectangle shape, starting at the given start hex', function() {
                const coordinates = rectangle(2, 3, Hex(-4, -2)).map(hex => hex.coordinates())
                expect(coordinates).to.deep.include.members([
                    { x: -4, y: -2, z: 6 },
                    { x: -3, y: -2, z: 5 },
                    { x: -4, y: -1, z: 5 },
                    { x: -3, y: -1, z: 4 },
                    { x: -5, y: 0, z: 5 },
                    { x: -4, y: 0, z: 4 }
                ])
            })
        })

        describe('when called with direction 0', function() {
            it('returns the hexes in a rectangle shape, in an eastern direction', function() {
                const coordinates = rectangle(2, 2, null, 0).map(hex => hex.coordinates())
                expect(coordinates).to.deep.include.members([
                    { x: 0, y: 0, z: 0 },
                    { x: 1, y: 0, z: -1 },
                    { x: 0, y: 1, z: -1 },
                    { x: 1, y: 1, z: -2 }
                ])
            })
        })

        describe('when called with direction 1', function() {
            it('returns the hexes in a rectangle shape, in an eastern direction', function() {
                const coordinates = rectangle(2, 2, null, 1).map(hex => hex.coordinates())
                expect(coordinates).to.deep.include.members([
                    { x: 0, y: 0, z: 0 },
                    { x: 0, y: 1, z: -1 },
                    { x: 1, y: 0, z: -1 },
                    { x: 1, y: 1, z: -2 }
                ])
            })
        })

        describe('when called with direction 2', function() {
            it('returns the hexes in a rectangle shape, in an eastern direction', function() {
                const coordinates = rectangle(2, 2, null, 2).map(hex => hex.coordinates())
                expect(coordinates).to.deep.include.members([
                    { x: 0, y: 0, z: 0 },
                    { x: -1, y: 1, z: 0 },
                    { x: -1, y: 0, z: 1 },
                    { x: -2, y: 1, z: 1 }
                ])
            })
        })

        describe('when called with direction 3', function() {
            it('returns the hexes in a rectangle shape, in an eastern direction', function() {
                const coordinates = rectangle(2, 2, null, 3).map(hex => hex.coordinates())
                expect(coordinates).to.deep.include.members([
                    { x: 0, y: 0, z: 0 },
                    { x: -1, y: 0, z: 1 },
                    { x: -1, y: 1, z: 0 },
                    { x: -2, y: 1, z: 1 }
                ])
            })
        })

        describe('when called with direction 4', function() {
            it('returns the hexes in a rectangle shape, in an eastern direction', function() {
                const coordinates = rectangle(2, 2, null, 4).map(hex => hex.coordinates())
                expect(coordinates).to.deep.include.members([
                    { x: 0, y: 0, z: 0 },
                    { x: 0, y: -1, z: 1 },
                    { x: 1, y: -1, z: 0 },
                    { x: 1, y: -2, z: 1 }
                ])
            })
        })

        describe('when called with direction 5', function() {
            it('returns the hexes in a rectangle shape, in an eastern direction', function() {
                const coordinates = rectangle(2, 2, null, 5).map(hex => hex.coordinates())
                expect(coordinates).to.deep.include.members([
                    { x: 0, y: 0, z: 0 },
                    { x: 1, y: -1, z: 0 },
                    { x: 0, y: -1, z: 1 },
                    { x: 1, y: -2, z: 1 }
                ])
            })
        })
    })

    describe('when hexes have a flat orientation', function() {
        before(function() {
            Hex = HexFactory({ orientation: 'FLAT' })
            rectangle = methods.rectangleFactory({ Hex , is })
        })

        describe('when called without start hex or direction', function() {
            it('returns the hexes in a rectangle shape, starting at Hex(0)', function() {
                const coordinates = rectangle(2, 3).map(hex => hex.coordinates())
                expect(coordinates).to.deep.include.members([
                    { x: 0, y: 0, z: 0 },
                    { x: 1, y: 0, z: -1 },
                    { x: 2, y: 0, z: -2 },
                    { x: 0, y: 1, z: -1 },
                    { x: 1, y: 1, z: -2 },
                    { x: 2, y: 1, z: -3 }
                ])
            })
        })

        describe('when called with start hex', function() {
            it('returns the hexes in a rectangle shape, starting at the given start hex', function() {
                const coordinates = rectangle(2, 3, Hex(-4, -2)).map(hex => hex.coordinates())
                expect(coordinates).to.deep.include.members([
                    { x: -4, y: -2, z: 6 },
                    { x: -3, y: -2, z: 5 },
                    { x: -2, y: -2, z: 4 },
                    { x: -4, y: -1, z: 5 },
                    { x: -3, y: -1, z: 4 },
                    { x: -2, y: -1, z: 3 }
                ])
            })
        })

        describe('when called with direction 0', function() {
            it('returns the hexes in a rectangle shape, in an eastern direction', function() {
                const coordinates = rectangle(2, 2, null, 0).map(hex => hex.coordinates())
                expect(coordinates).to.deep.include.members([
                    { x: 0, y: 0, z: 0 },
                    { x: 1, y: 0, z: -1 },
                    { x: 0, y: 1, z: -1 },
                    { x: 1, y: 1, z: -2 }
                ])
            })
        })

        describe('when called with direction 1', function() {
            it('returns the hexes in a rectangle shape, in an eastern direction', function() {
                const coordinates = rectangle(2, 2, null, 1).map(hex => hex.coordinates())
                expect(coordinates).to.deep.include.members([
                    { x: 0, y: 0, z: 0 },
                    { x: 0, y: 1, z: -1 },
                    { x: 1, y: 0, z: -1 },
                    { x: 1, y: 1, z: -2 }
                ])
            })
        })

        describe('when called with direction 2', function() {
            it('returns the hexes in a rectangle shape, in an eastern direction', function() {
                const coordinates = rectangle(2, 2, null, 2).map(hex => hex.coordinates())
                expect(coordinates).to.deep.include.members([
                    { x: 0, y: 0, z: 0 },
                    { x: -1, y: 1, z: 0 },
                    { x: -1, y: 0, z: 1 },
                    { x: -2, y: 1, z: 1 }
                ])
            })
        })

        describe('when called with direction 3', function() {
            it('returns the hexes in a rectangle shape, in an eastern direction', function() {
                const coordinates = rectangle(2, 2, null, 3).map(hex => hex.coordinates())
                expect(coordinates).to.deep.include.members([
                    { x: 0, y: 0, z: 0 },
                    { x: -1, y: 0, z: 1 },
                    { x: -1, y: 1, z: 0 },
                    { x: -2, y: 1, z: 1 }
                ])
            })
        })

        describe('when called with direction 4', function() {
            it('returns the hexes in a rectangle shape, in an eastern direction', function() {
                const coordinates = rectangle(2, 2, null, 4).map(hex => hex.coordinates())
                expect(coordinates).to.deep.include.members([
                    { x: 0, y: 0, z: 0 },
                    { x: 0, y: -1, z: 1 },
                    { x: 1, y: -1, z: 0 },
                    { x: 1, y: -2, z: 1 }
                ])
            })
        })

        describe('when called with direction 5', function() {
            it('returns the hexes in a rectangle shape, in an eastern direction', function() {
                const coordinates = rectangle(2, 2, null, 5).map(hex => hex.coordinates())
                expect(coordinates).to.deep.include.members([
                    { x: 0, y: 0, z: 0 },
                    { x: 1, y: -1, z: 0 },
                    { x: 0, y: -1, z: 1 },
                    { x: 1, y: -2, z: 1 }
                ])
            })
        })
    })
})
