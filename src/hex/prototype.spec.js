/* eslint-env mocha */

import { expect } from 'chai'
import sinon from 'sinon'

import { ensureXY } from '../utils'
import { EPSILON } from './constants'
import extendHexFactory from './'
import * as methods from './prototype'

const extendHex = extendHexFactory({ ensureXY })
const Hex = extendHex()

describe('set', () => {
    let HexSpy, set

    beforeEach(function() {
        HexSpy = sinon.spy(Hex)
        set = methods.setFactory({ Hex: HexSpy })
    })

    it('passes any arguments to the Hex() factory', () => {
        set.call({}, 1, 2)
        expect(HexSpy).to.have.been.calledWithExactly(1, 2)

        set.call({}, { x: 1, y: 2 })
        expect(HexSpy).to.have.been.calledWithExactly({ x: 1, y: 2 })

        set.call({}, 'invalid argument')
        expect(HexSpy).to.have.been.calledWithExactly('invalid argument')
    })

    it('merges the return value of Hex() into itself', () => {
        const self = { x: 1, y: 2 }

        set.call(self, { x: 5, y: -2 })
        expect(self).to.eql({ x: 5, y: -2 })

        set.call(self)
        expect(self).to.eql({ x: 0, y: 0 })
    })

    it('returns itself', () => {
        const self = { x: 1, y: 2 }
        const result = set.call(self)

        expect(result).to.equal(self)
    })
})

describe('coordinates', function() {
    it('returns the hex\'s x and y coordinates', function() {
        const boundCoordinates = methods.coordinates.bind({ x: 8, y: -3 })
        expect(boundCoordinates()).to.eql({ x: 8, y: -3 })
    })
})

describe('cubeToCartesian', () => {
    describe('when the hex has a pointy orientation', () => {
        it('converts the passed cube coordinates to rectangular coordinates', () => {
            const isPointy = sinon.stub().returns(true)
            let cubeToCartesian = methods.cubeToCartesian.bind({ isPointy, offset: -1 })
            expect(cubeToCartesian({ q: 2, r: 1, s: -3 })).to.eql({ x: 2, y: 1 })
            cubeToCartesian = methods.cubeToCartesian.bind({ isPointy, offset: 1 })
            expect(cubeToCartesian({ q: 2, r: 1, s: -3 })).to.eql({ x: 3, y: 1 })
        })
    })

    describe('when the hex has a flat orientation', () => {
        it('converts the passed cube coordinates to rectangular coordinates', () => {
            const isPointy = sinon.stub().returns(false)
            let cubeToCartesian = methods.cubeToCartesian.bind({ isPointy, offset: -1 })
            expect(cubeToCartesian({ q: 1, r: 1, s: -2 })).to.eql({ x: 1, y: 1 })
            cubeToCartesian = methods.cubeToCartesian.bind({ isPointy, offset: 1 })
            expect(cubeToCartesian({ q: 1, r: 1, s: -2 })).to.eql({ x: 1, y: 2 })
        })
    })
})

describe('cartesianToCube', () => {
    describe('when the hex has a pointy orientation', () => {
        it('converts the passed rectangular coordinates to cube coordinates', () => {
            const isPointy = sinon.stub().returns(true)
            let cartesianToCube = methods.cartesianToCube.bind({ isPointy, offset: -1 })
            expect(cartesianToCube({ x: 2, y: 1 })).to.eql({ q: 2, r: 1, s: -3 })
            cartesianToCube = methods.cartesianToCube.bind({ isPointy, offset: 1 })
            expect(cartesianToCube({ x: 2, y: 1 })).to.eql({ q: 1, r: 1, s: -2 })
        })
    })

    describe('when the hex has a flat orientation', () => {
        it('converts the passed rectangular coordinates to cube coordinates', () => {
            const isPointy = sinon.stub().returns(false)
            let cartesianToCube = methods.cartesianToCube.bind({ isPointy, offset: -1 })
            expect(cartesianToCube({ x: 1, y: 1 })).to.eql({ q: 1, r: 1, s: -2 })
            cartesianToCube = methods.cartesianToCube.bind({ isPointy, offset: 1 })
            expect(cartesianToCube({ x: 1, y: 1 })).to.eql({ q: 1, r: 0, s: -1 })
        })
    })
})

describe('isPointy', function() {
    it('returns whether the hex has a pointy orientation', function() {
        let isPointy = methods.isPointy.bind({ orientation: 'pointy' })
        expect(isPointy()).to.be.true
        isPointy = methods.isPointy.bind({ orientation: 'pointy' })
        expect(isPointy()).to.be.true
        isPointy = methods.isPointy.bind({ orientation: 'flat' })
        expect(isPointy()).to.be.false
    })
})

describe('isFlat', function() {
    it('returns whether the hex has a flat orientation', function() {
        let isFlat = methods.isFlat.bind({ orientation: 'flat' })
        expect(isFlat()).to.be.true
        isFlat = methods.isFlat.bind({ orientation: 'flat' })
        expect(isFlat()).to.be.true
        isFlat = methods.isFlat.bind({ orientation: 'pointy' })
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
        width = sinon.stub().returns(2)
        height = sinon.stub().returns(2)
        isPointy = sinon.stub()
        Point = sinon.stub().callsFake((x, y) => ({ x, y }))
        corners = methods.cornersFactory({ Point })
        context = {
            origin: {},
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

        it('returns an array of 6 corners relative to origin', function() {
            context.origin = { x: 1, y: 1 }
            const result = corners.call(context)

            expect(result).to.have.lengthOf(6)
            expect(Point.getCall(0).args).to.eql([1, -0.5])
            expect(Point.getCall(1).args).to.eql([1, 0.5])
            expect(Point.getCall(2).args).to.eql([0, 1])
            expect(Point.getCall(3).args).to.eql([-1, 0.5])
            expect(Point.getCall(4).args).to.eql([-1, -0.5])
            expect(Point.getCall(5).args).to.eql([0, -1])
        })
    })

    describe('when the hex has a flat orientation', function() {
        beforeEach(function() {
            isPointy.returns(false)
        })

        it('returns an array of 6 corners relative to origin', function() {
            context.origin = { x: 1, y: 1 }
            const result = corners.call(context)

            expect(result).to.have.lengthOf(6)
            expect(Point.getCall(0).args).to.eql([1, 0])
            expect(Point.getCall(1).args).to.eql([0.5, 1])
            expect(Point.getCall(2).args).to.eql([-0.5, 1])
            expect(Point.getCall(3).args).to.eql([-1, 0])
            expect(Point.getCall(4).args).to.eql([-0.5, -1])
            expect(Point.getCall(5).args).to.eql([0.5, -1])
        })
    })
})

describe('toPoint', function() {
    let Point, toPoint, isPointy, context

    beforeEach(function() {
        Point = sinon.stub().returns('point result')
        toPoint = methods.toPointFactory({ Point })
        isPointy = sinon.stub()
        context = {
            q: 1,
            r: 1,
            size: 1,
            isPointy
        }
    })

    it('returns the point', function() {
        const result = toPoint.call(context)
        expect(result).to.eql('point result')
    })

    describe('when the hex has a pointy orientation', function() {
        beforeEach(function() {
            isPointy.returns(true)
        })

        it('creates a new point', function() {
            toPoint.call(context)
            expect(Point.firstCall.args[0]).to.be.closeTo(2.5980, 0.0005)
            expect(Point.firstCall.args[1]).to.equal(1.5)
        })
    })

    describe('when the hex has a flat orientation', function() {
        beforeEach(function() {
            isPointy.returns(false)
        })

        it('creates a new point', function() {
            toPoint.call(context)
            expect(Point.firstCall.args[0]).to.equal(1.5)
            expect(Point.firstCall.args[1]).to.be.closeTo(2.5980, 0.0005)
        })
    })
})

describe('add', function () {
    let HexSpy

    before(function () {
        HexSpy = sinon.spy(Hex)
    })

    it('returns a new hex where the coordinates are the sum of the current and passed hex', function () {
        const add = methods.addFactory({ Hex: HexSpy }).bind({ x: 1, y: -3 })
        const result = add(Hex(2, 0))

        expect(HexSpy).to.have.been.calledWith(3, -3)
        expect(result).to.contain({ x: 3, y: -3 })
    })

    it('transfers any custom properties the current hex might have', function() {
        const result = Hex.call({ x: 0, y: 0, custom: 'add()' }).add(Hex())
        expect(result).to.contain({ custom: 'add()' })
    })
})

describe('subtract', function () {
    let HexSpy

    before(function() {
        HexSpy = sinon.spy(Hex)
    })

    it('returns a new hex where the coordinates are the difference between the current and the passed hex', function () {
        const subtract = methods.subtractFactory({ Hex: HexSpy }).bind({ x: 1, y: -3 })
        const result = subtract(Hex(2, 0))

        expect(HexSpy).to.have.been.calledWith(-1, -3)
        expect(result).to.contain({ x: -1, y: -3 })
    })

    it('transfers any custom properties the current hex might have', function() {
        const subtract = methods.subtractFactory({ Hex: HexSpy }).bind({
            x: 0,
            y: 0,
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

describe('distance', function () {
    it('returns the highest absolute coordinate of the other hex coordinates subtracted from the current', function () {
        const distance = methods.distance.bind({ q: 1, r: 2, s: -3 })
        expect(distance({ q: 1, r: 1, s: 1 })).to.equal(4)
    })
})

describe('round', function () {
    let HexStub, round

    before(function () {
        HexStub = sinon.stub().returnsThis()
        round = methods.roundFactory({ Hex: HexStub }).bind({ q: 2.9, r: 2.2, s: -5.1, custom: 'round()' })
    })

    it('rounds floating point coordinates to their nearest integer coordinates', function () {
        round()
        expect(HexStub).to.have.been.calledWith({ q: 3, r: 2, s: -5 })
    })

    it('transfers any custom properties the current hex might have', function() {
        expect(round()).to.have.property('custom', 'round()')
    })
})

describe('lerp', function () {
    let HexStub, lerp

    before(function() {
        HexStub = sinon.stub().returnsThis()
        lerp = methods.lerpFactory({ Hex: HexStub }).bind({ q: 0, r: 0, s: 0, custom: 'lerp()' })
    })

    it('returns an interpolation between the current and passed hex for a `t` between 0..1', function () {
        lerp({ q: 4, r: -5, s: 1 }, 0.5)
        expect(HexStub).to.have.been.calledWith({ q: 2, r: -2.5, s: 0.5 })
    })

    it('transfers any custom properties the current hex might have', function() {
        expect(lerp({})).to.have.property('custom', 'lerp()')
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
        expect(Hex(1, 2).toString()).to.eql('1,2')
    })
})
