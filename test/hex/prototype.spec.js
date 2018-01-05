import { expect } from 'chai'
import sinon from 'sinon'

import {
    DIRECTION_COORDINATES,
    DIAGONAL_DIRECTION_COORDINATES,
    EPSILON
} from '../../src/hex/constants'
import createHexFactory from '../../src/hex'
import * as methods from '../../src/hex/prototype'

const Hex = createHexFactory()

describe('coordinates', function() {
    it('returns the hex\'s x, y and z coordinates', function() {
        const boundCoordinates = methods.coordinates.bind({ x: 8, y: -3, z: -5 })
        expect(boundCoordinates()).to.eql({ x: 8, y: -3, z: -5 })
    })
})

describe('isPointy', function() {
    it('returns whether the hex has a pointy orientation', function() {
        let isPointy = methods.isPointy.bind({ orientation: 'POINTY' })
        expect(isPointy()).to.be.true
        isPointy = methods.isPointy.bind({ orientation: 'pointy' })
        expect(isPointy()).to.be.false
        isPointy = methods.isPointy.bind({ orientation: 'FLAT' })
        expect(isPointy()).to.be.false
    })
})

describe('isFlat', function() {
    it('returns whether the hex has a flat orientation', function() {
        let isFlat = methods.isFlat.bind({ orientation: 'FLAT' })
        expect(isFlat()).to.be.true
        isFlat = methods.isFlat.bind({ orientation: 'flat' })
        expect(isFlat()).to.be.false
        isFlat = methods.isFlat.bind({ orientation: 'POINTY' })
        expect(isFlat()).to.be.false
    })
})

describe('oppositeCornerDistance', function() {
    it('returns the distance between two opposite corners of the hex', function() {
        const oppositeCornerDistance = methods.oppositeCornerDistance.bind({ size: 1 })
        expect(oppositeCornerDistance()).to.equal(2)
    })
})

describe('oppositeSideDistance', function() {
    it('returns the distance between two opposite sides of a hex', function() {
        const oppositeCornerDistance = sinon.stub().returns(1)
        const oppositeSideDistance = methods.oppositeSideDistance.bind({ oppositeCornerDistance })
        const result = oppositeSideDistance()

        expect(oppositeCornerDistance).to.have.been.called
        expect(result).to.be.closeTo(0.8660, 0.0005)
    })
})

describe('width', function() {
    beforeEach(function() {
        sinon.stub(methods, 'isPointy')
    })
    afterEach(function() {
        methods.isPointy.restore()
    })

    describe('when the hex has a pointy orientation', function() {
        it('returns Hex.oppositeSideDistance()', function() {
            methods.isPointy.returns(true)
            sinon.spy(methods, 'oppositeSideDistance')

            methods.width()
            expect(methods.oppositeSideDistance).to.have.been.called

            methods.oppositeSideDistance.restore()
        })
    })

    describe('when the hex has a flat orientation', function() {
        it('returns Hex.oppositeCornerDistance()', function() {
            methods.isPointy.returns(false)
            sinon.spy(methods, 'oppositeCornerDistance')

            methods.width()
            expect(methods.oppositeCornerDistance).to.have.been.called

            methods.oppositeCornerDistance.restore()
        })
    })
})

describe('height', function() {
    beforeEach(function() {
        sinon.stub(methods, 'isPointy')
    })
    afterEach(function() {
        methods.isPointy.restore()
    })

    describe('when the hex has a pointy orientation', function() {
        it('returns Hex.oppositeCornerDistance()', function() {
            methods.isPointy.returns(true)
            sinon.spy(methods, 'oppositeCornerDistance')

            methods.height()
            expect(methods.oppositeCornerDistance).to.have.been.called

            methods.oppositeCornerDistance.restore()
        })
    })

    describe('when the hex has a flat orientation', function() {
        it('returns Hex.oppositeSideDistance()', function() {
            methods.isPointy.returns(false)
            sinon.spy(methods, 'oppositeSideDistance')

            methods.height()
            expect(methods.oppositeSideDistance).to.have.been.called

            methods.oppositeSideDistance.restore()
        })
    })
})

describe('corners', function() {
    let width, height, isPointy, Point, corners, context

    beforeEach(function() {
        width = sinon.stub().returns(1)
        height = sinon.stub().returns(1)
        isPointy = sinon.stub()
        Point = sinon.stub().callsFake((...coordinates) => coordinates)
        corners = methods.cornersFactory({ Point })
        context = {
            width,
            height,
            isPointy
        }
    })

    it('calls the hex\'s witdh(), height() and isPointy() methods', function() {
        corners.call(context)
        expect(width).to.have.been.called
        expect(height).to.have.been.called
        expect(isPointy).to.have.been.called
    })

    describe('when the hex has a pointy orientation', function() {
        beforeEach(function() {
            isPointy.returns(true)
        })

        it('returns an array of 6 corners', function() {
            expect(corners.call(context)).to.eql([
                [ 1, 0.25 ],
                [ 1, 0.75 ],
                [ 0.5, 1 ],
                [ 0, 0.75 ],
                [ 0, 0.25 ],
                [ 0.5, 0 ]
            ])
        })
    })

    describe('when the hex has a flat orientation', function() {
        beforeEach(function() {
            isPointy.returns(false)
        })

        it('returns an array of 6 corners', function() {
            expect(corners.call(context)).to.eql([
                [ 1, 0.5 ],
                [ 0.75, 1 ],
                [ 0.25, 1 ],
                [ 0, 0.5 ],
                [ 0.25, 0 ],
                [ 0.75, 0 ],
            ])
        })
    })
})

describe('toPoint', function() {
    let Point, toPoint, context

    beforeEach(function() {
        Point = sinon.stub().returns('point result')
        toPoint = methods.toPointFactory({ Point })
        context = {
            x: 1,
            y: 1,
            size: 1,
            origin: { x: 0, y: 0 },
            isPointy: () => null
        }
    })

    describe('when the hex has a pointy orientation', function() {
        beforeEach(function() {
            context.isPointy = () => true
        })

        it('creates a new point', function() {
            toPoint.call(context)
            expect(Point.firstCall.args[0]).to.be.closeTo(2.5980, 0.0005)
            expect(Point.firstCall.args[1]).to.equal(1.5)
        })
    })

    describe('when the hex has a flat orientation', function() {
        beforeEach(function() {
            context.isPointy = () => false
        })

        it('creates a new point', function() {
            toPoint.call(context)
            expect(Point.firstCall.args[0]).to.equal(1.5)
            expect(Point.firstCall.args[1]).to.be.closeTo(2.5980, 0.0005)
        })
    })

    it('subtracts the hex\'s origin from that point', function() {
        context.origin.x = 10
        context.origin.y = 10
        toPoint.call(context)
        expect(Point.firstCall.args[0]).to.equal(1.5 - 10)
        expect(Point.firstCall.args[1]).to.be.closeTo(2.5980 - 10, 0.0005)
    })

    it('returns the point', function() {
        const result = toPoint.call(context)
        expect(result).to.eql('point result')
    })
})

describe('add', function () {
    let HexSpy

    before(function () {
        HexSpy = sinon.spy(Hex)
    })

    it('returns a new hex where the coordinates are the sum of the current and passed hex', function () {
        const add = methods.addFactory({ Hex: HexSpy }).bind({ x: 1, y: -3, z: 2 })
        const result = add(Hex(2, 0, -2))

        expect(HexSpy).to.have.been.calledWith(3, -3, 0)
        expect(result).to.contain({ x: 3, y: -3, z: 0 })
    })

    it('transfers any custom properties the current hex might have', function() {
        const result = Hex.call({
            x: 0,
            y: 0,
            z: 0,
            custom: 'add()'
        }).add(Hex())
        expect(result).to.contain({ custom: 'add()' })
    })
})

describe('subtract', function () {
    let HexSpy

    before(function() {
        HexSpy = sinon.spy(Hex)
    })

    it('returns a new hex where the coordinates are the difference between the current and the passed hex', function () {
        const subtract = methods.subtractFactory({ Hex: HexSpy }).bind({ x: 1, y: -3, z: 2 })
        const result = subtract(Hex(2, 0, -2))

        expect(HexSpy).to.have.been.calledWith(-1, -3, 4)
        expect(result).to.contain({ x: -1, y: -3, z: 4 })
    })

    it('transfers any custom properties the current hex might have', function() {
        const subtract = methods.subtractFactory({ Hex: HexSpy }).bind({
            x: 0,
            y: 0,
            z: 0,
            custom: 'subtract()'
        })
        const result = subtract(Hex())
        expect(result).to.contain({ custom: 'subtract()' })
    })
})

describe('equals', function () {
    it('returns whether the coordinates of the current and the passed hex are equal', function() {
        expect(Hex().equals(Hex())).to.be.true
        expect(Hex(5, -3).equals(Hex(-1, 2))).to.be.false
    })

    it('ignores any custom properties', function() {
        const hex1 = Hex.call({ custom: 1 }, 4, 4)
        const hex2 = Hex.call({ custom: 2 }, 4, 4)

        expect(hex1.equals(hex2)).to.be.true
    })
})

describe('neighbor', function () {
    let neighbor, add

    before(function () {
        add = sinon.stub().returns('add result')
        neighbor = methods.neighbor.bind({ add })
    })

    describe('of a given hex', function () {
        it('returns the result of the current hex coordinates added to DIRECTION_COORDINATES[0]', function () {
            const result = neighbor()
            expect(add).to.have.been.calledWith(DIRECTION_COORDINATES[0])
            expect(result).to.eql('add result')
        })
    })

    describe('with a given direction between 0 and 5', function () {
        it('calls add() with the given direction coordinates', function () {
            neighbor(0)
            expect(add).to.have.been.calledWith(DIRECTION_COORDINATES[0])
            neighbor(1)
            expect(add).to.have.been.calledWith(DIRECTION_COORDINATES[1])
            neighbor(2)
            expect(add).to.have.been.calledWith(DIRECTION_COORDINATES[2])
            neighbor(3)
            expect(add).to.have.been.calledWith(DIRECTION_COORDINATES[3])
            neighbor(4)
            expect(add).to.have.been.calledWith(DIRECTION_COORDINATES[4])
            neighbor(5)
            expect(add).to.have.been.calledWith(DIRECTION_COORDINATES[5])
        })
    })

    describe('with a given direction < 0 or > 5', function () {
        it('calls add() with the remainder of the given direction', function () {
            neighbor(6)
            expect(add).to.have.been.calledWith(DIRECTION_COORDINATES[0])
            neighbor(92)
            expect(add).to.have.been.calledWith(DIRECTION_COORDINATES[2])
            neighbor(-4)
            expect(add).to.have.been.calledWith(DIRECTION_COORDINATES[4])
        })
    })

    describe('with the diagonal flag enabled', function () {
        it('calls add() with the given diagonal direction', function () {
            neighbor(3, true)
            expect(add).to.have.been.calledWith(DIAGONAL_DIRECTION_COORDINATES[3])
        })
    })

    it('transfers any custom properties the current hex might have', function() {
        const result = Hex.call({ custom: 'neighbor()' }).neighbor()
        expect(result).to.have.property('custom', 'neighbor()')
    })
})

describe('neighbors', function () {
    let neighbors, add

    beforeEach(function () {
        add = sinon.stub().returns('add result')
        neighbors = methods.neighbors.bind({ add })
    })

    it('calls add() with each direction and returns the results', function () {
        const result = neighbors()
        expect(add.getCall(0).args[0]).to.eql(DIRECTION_COORDINATES[0])
        expect(add.getCall(1).args[0]).to.eql(DIRECTION_COORDINATES[1])
        expect(add.getCall(2).args[0]).to.eql(DIRECTION_COORDINATES[2])
        expect(add.getCall(3).args[0]).to.eql(DIRECTION_COORDINATES[3])
        expect(add.getCall(4).args[0]).to.eql(DIRECTION_COORDINATES[4])
        expect(add.getCall(5).args[0]).to.eql(DIRECTION_COORDINATES[5])
        expect(result).to.eql([
            'add result',
            'add result',
            'add result',
            'add result',
            'add result',
            'add result'
        ])
    })

    describe('when called with a truthy value', function() {
        it('calls add() with each diagonal direction and returns the results', function () {
            const result = neighbors(true)
            expect(add.getCall(0).args[0]).to.eql(DIAGONAL_DIRECTION_COORDINATES[0])
            expect(add.getCall(1).args[0]).to.eql(DIAGONAL_DIRECTION_COORDINATES[1])
            expect(add.getCall(2).args[0]).to.eql(DIAGONAL_DIRECTION_COORDINATES[2])
            expect(add.getCall(3).args[0]).to.eql(DIAGONAL_DIRECTION_COORDINATES[3])
            expect(add.getCall(4).args[0]).to.eql(DIAGONAL_DIRECTION_COORDINATES[4])
            expect(add.getCall(5).args[0]).to.eql(DIAGONAL_DIRECTION_COORDINATES[5])
            expect(result).to.eql([
                'add result',
                'add result',
                'add result',
                'add result',
                'add result',
                'add result'
            ])
        })
    })

    it('transfers any custom properties the current hex might have', function() {
        const result = Hex.call({ custom: 'neighbors()' }).neighbors()
        result.forEach(hex => expect(hex).to.have.property('custom', 'neighbors()'))
    })
})

describe('distance', function () {
    it('returns the highest absolute coordinate of the other hex coordinates subtracted from the current', function () {
        const distance = methods.distance.bind({ x: 1, y: 2, z: 3 })
        expect(distance({ x: 1, y: 1, z: 1 })).to.equal(2)
    })
})

describe('round', function () {
    let HexSpy

    before(function () {
        HexSpy = sinon.spy(Hex)
    })

    it('rounds floating point coordinates to their nearest integer coordinates', function () {
        const round = methods.roundFactory({ Hex: HexSpy }).bind({ x: 2.9, y: 2.2, z: -4.7 })
        const result = round()

        expect(HexSpy).to.have.been.calledWith(3, 2, -5)
        expect(result).to.contain({ x: 3, y: 2, z: -5 })
    })

    it('transfers any custom properties the current hex might have', function() {
        const result = Hex.call({ custom: 'round()' }).round()
        expect(result).to.have.property('custom', 'round()')
    })
})

describe('lerp', function () {
    let HexSpy

    before(function() {
        HexSpy = sinon.spy(Hex)
    })

    it('returns an interpolation between the current and passed hex for a `t` between 0..1', function () {
        const lerp = methods.lerpFactory({ Hex: HexSpy }).bind({ x: 0, y: 0, z: 0 })
        const result = lerp(Hex(4, -5, 1), 0.5)

        expect(HexSpy).to.have.been.calledWith(2, -2.5, 0.5)
        expect(result).to.contain({ x: 2, y: -2.5, z: 0.5 })
    })

    it('transfers any custom properties the current hex might have', function() {
        const result = Hex.call({
            x: 0,
            y: 0,
            z: 0,
            custom: 'lerp()'
        }).lerp({})
        expect(result).to.have.property('custom', 'lerp()')
    })
})

describe('nudge', function () {
    it('returns the current hex with a tiny offset', function () {
        const add = sinon.stub().returns('add result')
        const nudge = methods.nudge.bind({ add })
        const result = nudge()
        expect(add).to.have.been.calledWith(EPSILON)
        expect(result).to.eql('add result')
    })

    it('transfers any custom properties the current hex might have', function() {
        const result = Hex.call({ custom: 'nudge()' }).nudge()
        expect(result).to.have.property('custom', 'nudge()')
    })
})

describe('toString', function() {
    it('returns a string containing the coordinates of the hex', function() {
        expect(Hex(1, 2, -3).toString()).to.eql('{ x: 1, y: 2, z: -3 }')
    })
})
