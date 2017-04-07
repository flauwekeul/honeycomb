import { expect } from 'chai'
import sinon from 'sinon'

import * as methods from '../../src/hex/prototype'

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

describe('view', function() {
    it('returns the view of the hex', function() {
        const template = sinon.stub().returns('view')
        const context = { template }
        const view = methods.view.bind(context)
        const result = view()

        expect(template).to.have.been.calledWith(context)
        expect(result).to.equal('view')
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

describe('center', function() {
    it('returns the relative center of the given hex', function() {
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

describe('toPoint', function() {
    let subtract, Point, toPoint, context

    beforeEach(function() {
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

    describe('when the hex has a pointy orientation', function() {
        beforeEach(function() {
            context.isPointy = () => true
        })

        it('creates a new point', function() {
            toPoint.bind(context)()
            expect(Point.firstCall.args[0]).to.be.closeTo(2.5980, 0.0005)
            expect(Point.firstCall.args[1]).to.equal(1.5)
        })
    })

    describe('when the hex has a flat orientation', function() {
        beforeEach(function() {
            context.isPointy = () => false
        })

        it('creates a new point', function() {
            toPoint.bind(context)()
            expect(Point.firstCall.args[0]).to.equal(1.5)
            expect(Point.firstCall.args[1]).to.be.closeTo(2.5980, 0.0005)
        })
    })

    it('subtracts the hex\'s origin from that point', function() {
        toPoint.bind(context)()
        expect(subtract).to.have.been.calledWith('origin result')
    })

    it('returns the point', function() {
        const result = toPoint.bind(context)()
        expect(result).to.eql('subtract result')
    })
})
