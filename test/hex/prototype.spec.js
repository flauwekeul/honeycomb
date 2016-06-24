import { expect } from 'chai'
import sinon from 'sinon'

import { ORIENTATIONS } from '../../src/hex/constants'
import Hex from '../../src/hex'

describe('Hex prototype', () => {
    describe('coordinates', () => {
        it('returns the x, y and z coordinates', () => {
            expect(Hex().coordinates()).to.eql({ x: 0, y: 0, z: 0 })
            expect(Hex(8, -3, -5).coordinates()).to.eql({ x: 8, y: -3, z: -5 })
        })
    })

    describe('orientation', () => {
        describe('when called without arguments', () => {
            it('returns the orientation of every hex', () => {
                Hex.prototype.orientation('flat')
                expect(Hex.prototype.orientation()).to.equal(ORIENTATIONS.FLAT)
            })
        })

        describe('when called with an orientation', () => {
            it('sets the orientation of every hex', () => {
                Hex.prototype.orientation('pointy')
                const hex1 = Hex()
                const hex2 = Hex()
                expect(Hex.prototype.orientation()).to.equal(ORIENTATIONS.POINTY)
                expect(hex1.orientation()).to.equal(ORIENTATIONS.POINTY)
                expect(hex2.orientation()).to.equal(ORIENTATIONS.POINTY)
            })
        })
    })

    describe('isPointy', () => {
        it('returns whether the hex is POINTY', () => {
            Hex.prototype.orientation('pointy')
            expect(Hex().isPointy()).to.be.true
            Hex.prototype.orientation('flat')
            expect(Hex().isPointy()).to.be.false
        })
    })

    describe('isFlat', () => {
        it('returns whether the hex is FLAT', () => {
            Hex.prototype.orientation('flat')
            expect(Hex().isFlat()).to.be.true
            Hex.prototype.orientation('pointy')
            expect(Hex().isFlat()).to.be.false
        })
    })

    describe('size', () => {
        describe('when called without arguments', () => {
            it('returns the size of every hex', () => {
                Hex.prototype.size(5)
                expect(Hex.prototype.size()).to.equal(5)
            })
        })

        describe('when called with a valid size', () => {
            it('sets the size of every hex', () => {
                Hex.prototype.size(0)
                const hex1 = Hex()
                const hex2 = Hex()
                expect(Hex.prototype.size()).to.equal(0)
                expect(hex1.size()).to.equal(0)
                expect(hex2.size()).to.equal(0)
            })
        })

        describe('when called with an invalid size', () => {
            before(() => sinon.spy(console, 'warn'))
            after(() => console.warn.restore())

            it('shows a warning', () => {
                Hex.prototype.size('invalid')
                expect(console.warn).to.have.been.calledWith('Invalid size: invalid')
                Hex.prototype.size(-1)
                expect(console.warn).to.have.been.calledWith('Invalid size: -1')
                Hex.prototype.size(null)
                expect(console.warn).to.have.been.calledWith('Invalid size: null')
            })
        })
    })

    describe('oppositeCornerDistance', () => {
        it('returns the distance between two opposite corners of a hex', () => {
            Hex.prototype.size(10)
            expect(Hex.prototype.oppositeCornerDistance()).to.equal(20)
        })
    })

    describe('oppositeSideDistance', () => {
        it('returns the distance between two opposite sides of a hex', () => {
            Hex.prototype.size(10)
            expect(Hex.prototype.oppositeSideDistance()).to.be.closeTo(17.3205, 0.0005)
        })
    })

    describe('width', () => {
        describe('when orientation is POINTY', () => {
            before(() => Hex.prototype.orientation('pointy'))

            it('returns Hex.prototype.oppositeSideDistance()', () => {
                Hex.prototype.size(10)
                expect(Hex.prototype.width()).to.equal(Hex.prototype.oppositeSideDistance())
            })
        })

        describe('when orientation is FLAT', () => {
            before(() => Hex.prototype.orientation('flat'))

            it('returns Hex.prototype.oppositeCornerDistance()', () => {
                Hex.prototype.size(10)
                expect(Hex.prototype.width()).to.equal(Hex.prototype.oppositeCornerDistance())
            })
        })
    })

    describe('height', () => {
        describe('when orientation is POINTY', () => {
            before(() => Hex.prototype.orientation('pointy'))

            it('returns Hex.prototype.oppositeCornerDistance()', () => {
                Hex.prototype.size(10)
                expect(Hex.prototype.height()).to.equal(Hex.prototype.oppositeCornerDistance())
            })
        })

        describe('when orientation is FLAT', () => {
            before(() => Hex.prototype.orientation('flat'))

            it('returns Hex.prototype.oppositeSideDistance()', () => {
                Hex.prototype.size(10)
                expect(Hex.prototype.height()).to.equal(Hex.prototype.oppositeSideDistance())
            })
        })
    })

    describe('add', () => {
        it('adds all coordinates of the given hex to itself', () => {
            const result = Hex(1, -3, 2).add(Hex(2, 0, -2))
            expect(result).to.contain({ x: 3, y: -3, z: 0 })
        })
    })

    describe('subtract', () => {
        it('subtracts all coordinates of given hex from itself', () => {
            const result = Hex(1, -3, 2).subtract(Hex(2, 0, -2))
            expect(result).to.contain({ x: -1, y: -3, z: 4 })
        })
    })

    describe('neighbor', () => {
        describe('without arguments', () => {
            it('returns the neighboring hex in direction 0', () => {
                const result = Hex(-5, -2, 7).neighbor()
                expect(result).to.contain({ x: -4, y: -3, z: 7 })
            })
        })

        describe('with a given direction in range 0..5', () => {
            it('returns the neighboring hex in the given direction', () => {
                const result = Hex(-5, -2, 7).neighbor(3)
                expect(result).to.contain({ x: -6, y: -1, z: 7 })
            })
        })

        describe('with a given direction > 5', () => {
            it('returns the neighboring hex in the given direction after getting the direction\'s remainder', () => {
                const result = Hex(-5, -2, 7).neighbor(38)
                expect(result).to.contain({ x: -5, y: -1, z: 6 })
            })
        })

        describe('with the diagonal flag enabled', () => {
            it('returns the diagonally neighboring hex in the given direction', () => {
                const result = Hex(-5, -2, 7).neighbor(5, true)
                expect(result).to.contain({ x: -4, y: -4, z: 8 })
            })
        })
    })

    describe('distance', () => {
        it('returns the amount of hexes from itself to the given hex', () => {
            const result = Hex(0, -3, 3).distance(Hex(2, 1, -3))
            expect(result).to.equal(6)
        })
    })

    describe('round', () => {
        it('rounds floating point coordinates to their nearest integer coordinates', () => {
            const result = Hex(2.7, 2.1, -4.8).round()
            expect(result).to.contain({ x: 3, y: 2, z: -5 })
        })
    })

    describe('lerp', () => {
        it('returns an interpolation between itself and the passed hex for a `t` between 0..1', () => {
            const result = Hex(0, 0, 0).lerp(Hex(4, -5, 1), 0.5)
            expect(result).to.contain({ x: 2, y: -2.5, z: 0.5 })
        })
    })

    describe('nudge', () => {
        it('returns itself with a tiny offset', () => {
            const result = Hex(-2, 6, -4).nudge()
            expect(result).to.contain({ x: -1.999999, y: 6.000001, z: -4.000002 })
        })
    })

    describe('toPoint', () => {
        describe('when orientation is pointy', () => {
            before(() => Hex.prototype.orientation('pointy'))

            it('returns the point', () => {
                const expectedX = 51.9615
                const expectedY = 35
                expect(Hex(2, 3).toPoint()).to.have.property('x').that.is.closeTo(expectedX, 0.0005)
                expect(Hex(2, 3).toPoint()).to.have.property('y').that.is.closeTo(expectedY, 0.0005)
            })
        })

        describe('when orientation is flat', () => {
            before(() => Hex.prototype.orientation('flat'))

            it('returns the point', () => {
                const expectedX = 20
                const expectedY = 60.6217
                expect(Hex(2, 3).toPoint()).to.have.property('x').that.is.closeTo(expectedX, 0.0005)
                expect(Hex(2, 3).toPoint()).to.have.property('y').that.is.closeTo(expectedY, 0.0005)
            })
        })
    })
})
