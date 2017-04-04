import { expect } from 'chai'
import sinon from 'sinon'

import * as methods from '../../src/hex/prototype'

describe('coordinates', () => {
    it('returns the hex\'s x, y and z coordinates', () => {
        const boundCoordinates = methods.coordinates.bind({ x: 8, y: -3, z: -5 })
        expect(boundCoordinates()).to.eql({ x: 8, y: -3, z: -5 })
    })
})

describe('isPointy', () => {
    it('returns whether the hex has a pointy orientation', () => {
        let isPointy = methods.isPointy.bind({ orientation: 'POINTY' })
        expect(isPointy()).to.be.true
        isPointy = methods.isPointy.bind({ orientation: 'pointy' })
        expect(isPointy()).to.be.false
        isPointy = methods.isPointy.bind({ orientation: 'FLAT' })
        expect(isPointy()).to.be.false
    })
})

describe('isFlat', () => {
    it('returns whether the hex has a flat orientation', () => {
        let isFlat = methods.isFlat.bind({ orientation: 'FLAT' })
        expect(isFlat()).to.be.true
        isFlat = methods.isFlat.bind({ orientation: 'flat' })
        expect(isFlat()).to.be.false
        isFlat = methods.isFlat.bind({ orientation: 'POINTY' })
        expect(isFlat()).to.be.false
    })
})

describe('oppositeCornerDistance', () => {
    it('returns the distance between two opposite corners of the hex', () => {
        const oppositeCornerDistance = methods.oppositeCornerDistance.bind({ size: 1 })
        expect(oppositeCornerDistance()).to.equal(2)
    })
})

describe('oppositeSideDistance', () => {
    it('returns the distance between two opposite sides of a hex', () => {
        const oppositeCornerDistance = sinon.stub().returns(1)
        const oppositeSideDistance = methods.oppositeSideDistance.bind({ oppositeCornerDistance })
        const result = oppositeSideDistance()

        expect(oppositeCornerDistance).to.have.been.called
        expect(result).to.be.closeTo(0.8660, 0.0005)
    })
})

describe('view', () => {
    it('returns the view of the hex', () => {
        const template = sinon.stub().returns('view')
        const context = { template }
        const view = methods.view.bind(context)
        const result = view()

        expect(template).to.have.been.calledWith(context)
        expect(result).to.equal('view')
    })
})

describe('width', () => {
    beforeEach(() => sinon.stub(methods, 'isPointy'))
    afterEach(() => methods.isPointy.restore())

    describe('when the hex has a pointy orientation', () => {
        it('returns Hex.oppositeSideDistance()', () => {
            methods.isPointy.returns(true)
            sinon.spy(methods, 'oppositeSideDistance')

            methods.width()
            expect(methods.oppositeSideDistance).to.have.been.called

            methods.oppositeSideDistance.restore()
        })
    })

    describe('when the hex has a flat orientation', () => {
        it('returns Hex.oppositeCornerDistance()', () => {
            methods.isPointy.returns(false)
            sinon.spy(methods, 'oppositeCornerDistance')

            methods.width()
            expect(methods.oppositeCornerDistance).to.have.been.called

            methods.oppositeCornerDistance.restore()
        })
    })
})

describe('height', () => {
    beforeEach(() => sinon.stub(methods, 'isPointy'))
    afterEach(() => methods.isPointy.restore())

    describe('when the hex has a pointy orientation', () => {
        it('returns Hex.oppositeCornerDistance()', () => {
            methods.isPointy.returns(true)
            sinon.spy(methods, 'oppositeCornerDistance')

            methods.height()
            expect(methods.oppositeCornerDistance).to.have.been.called

            methods.oppositeCornerDistance.restore()
        })
    })

    describe('when the hex has a flat orientation', () => {
        it('returns Hex.oppositeSideDistance()', () => {
            methods.isPointy.returns(false)
            sinon.spy(methods, 'oppositeSideDistance')

            methods.height()
            expect(methods.oppositeSideDistance).to.have.been.called

            methods.oppositeSideDistance.restore()
        })
    })
})

describe('center', () => {
    it('returns the relative center of the given hex', () => {
        const Point = sinon.stub().callsFake((...coordinates) => coordinates)
        const width = sinon.stub().returns(2)
        const height = sinon.stub().returns(2)
        const center = methods.centerFactory({ Point }).bind({ width, height })
        const result = center()

        expect(Point).to.have.been.calledWith(1, 1)
        expect(width).to.have.been.called
        expect(height).to.have.been.called
        expect(result).to.eql([1, 1])
    })
})

describe('toPoint', () => {
    let subtract, Point, toPoint, context

    beforeEach(() => {
        subtract = sinon.stub().returns('subtract result')
        Point = sinon.stub().returns({ subtract })
        toPoint = methods.toPointFactory({ Point })
        context = {
            x: 1,
            y: 1,
            size: 1,
            origin: 'origin result',
            isPointy: () => null
        }
    })

    describe('when the hex has a pointy orientation', () => {
        beforeEach(() => context.isPointy = () => true)

        it('creates a new point', () => {
            toPoint.bind(context)()
            expect(Point.firstCall.args[0]).to.be.closeTo(2.5980, 0.0005)
            expect(Point.firstCall.args[1]).to.equal(1.5)
        })
    })

    describe('when the hex has a flat orientation', () => {
        beforeEach(() => context.isPointy = () => false)

        it('creates a new point', () => {
            toPoint.bind(context)()
            expect(Point.firstCall.args[0]).to.equal(1.5)
            expect(Point.firstCall.args[1]).to.be.closeTo(2.5980, 0.0005)
        })
    })

    it('subtracts the hex\'s origin from that point', () => {
        toPoint.bind(context)()
        expect(subtract).to.have.been.calledWith('origin result')
    })

    it('returns the point', () => {
        const result = toPoint.bind(context)()
        expect(result).to.eql('subtract result')
    })
})

describe.skip('fromPoint', () => {
    let Point, Hex, round, fromPoint, context, point

    beforeEach(() => {
        Point = sinon.stub().callsFake(point => point)
        Hex = sinon.stub().returns('Hex result')
        round = sinon.stub().returns('round result')
        Hex.round = round
        context = {
            size: 1,
            isPointy: () => null
        }
        fromPoint = methods.fromPointFactory({ Point, Hex })
        point = { x: 1, y: 1 }
    })

    it('calls Point with the passed point to convert it to an actual point', () => {
        fromPoint.bind(context)(point)
        expect(Point).to.have.been.calledWith(point)
    })

    describe('when the hex has a pointy orientation', () => {
        beforeEach(() => context.isPointy = () => true)

        it('creates a new hex', () => {
            fromPoint.bind(context)(point)
            expect(Hex.firstCall.args[0]).to.be.closeTo(0.2440, 0.0005)
            expect(Hex.firstCall.args[1]).to.be.closeTo(0.6667, 0.0005)
        })
    })

    describe('when the hex has a flat orientation', () => {
        beforeEach(() => context.isPointy = () => false)

        it('creates a new hex', () => {
            fromPoint.bind(context)(point)
            expect(Hex.firstCall.args[0]).to.be.closeTo(0.6667, 0.0005)
            expect(Hex.firstCall.args[1]).to.be.closeTo(0.2440, 0.0005)
        })
    })

    it('rounds that hex', () => {
        fromPoint.bind(context)(point)
        expect(Hex.round).to.have.been.calledWith('Hex result')
    })

    it('returns the hex', () => {
        const result = fromPoint.bind(context)(point)
        expect(result).to.equal('round result')
    })
})
