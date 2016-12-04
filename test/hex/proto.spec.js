import { expect } from 'chai'
import sinon from 'sinon'

import { ORIENTATIONS } from '../../src/hex/constants'
import Hex from '../../src/hex'
import Point from '../../src/point'

describe('ProtoHex', () => {
    describe('thirdCoordinate', () => {
        it('returns a third coordinate using the given two coordinates', () => {
            const result = Hex.thirdCoordinate(3, -1)
            expect(result).to.equal(-2)
        })
    })

    describe('isValidSize', () => {
        it('returns true if passed size is valid', () => {
            expect(Hex.isValidSize(0)).to.be.true
            expect(Hex.isValidSize(4)).to.be.true
        })

        it('returns false if passed size is invalid', () => {
            expect(Hex.isValidSize(-2)).to.be.false
            expect(Hex.isValidSize(undefined)).to.be.false
            expect(Hex.isValidSize(null)).to.be.false
        })
    })

    describe('hexesBetween', () => {
        it('returns the hexes in a straight line between itself and the passed hex, inclusive', () => {
            const coordinates = Hex().hexesBetween(Hex(1, -5, 4)).map(hex => hex.coordinates())
            expect(coordinates).to.eql([
                { x: 0, y: 0, z: 0 },
                { x: 0, y: -1, z: 1 },
                { x: 0, y: -2, z: 2 },
                { x: 1, y: -3, z: 2 },
                { x: 1, y: -4, z: 3 },
                { x: 1, y: -5, z: 4 }
            ])
        })

        it('returns early if the given hex is its neighbor', () => {
            const coordinates = Hex().hexesBetween(Hex(1, -1, 0)).map(hex => hex.coordinates())
            expect(coordinates).to.eql([
                { x: 0, y: 0, z: 0 },
                { x: 1, y: -1, z: 0 }
            ])
        })
    })

    describe('coordinates', () => {
        it('returns the x, y and z coordinates', () => {
            expect(Hex().coordinates()).to.eql({ x: 0, y: 0, z: 0 })
            expect(Hex(8, -3, -5).coordinates()).to.eql({ x: 8, y: -3, z: -5 })
        })
    })

    describe('orientation', () => {
        describe('when called without arguments', () => {
            it('returns the orientation of every hex', () => {
                Hex.orientation('flat')
                expect(Hex.orientation()).to.equal(ORIENTATIONS.FLAT)
            })
        })

        describe('when called with an orientation', () => {
            it('sets the orientation of every hex', () => {
                Hex.orientation('pointy')
                const hex1 = Hex()
                const hex2 = Hex()
                expect(Hex.orientation()).to.equal(ORIENTATIONS.POINTY)
                expect(hex1.orientation()).to.equal(ORIENTATIONS.POINTY)
                expect(hex2.orientation()).to.equal(ORIENTATIONS.POINTY)
            })
        })
    })

    describe('isPointy', () => {
        it('returns whether the hex is POINTY', () => {
            Hex.orientation('pointy')
            expect(Hex().isPointy()).to.be.true
            Hex.orientation('flat')
            expect(Hex().isPointy()).to.be.false
        })
    })

    describe('isFlat', () => {
        it('returns whether the hex is FLAT', () => {
            Hex.orientation('flat')
            expect(Hex().isFlat()).to.be.true
            Hex.orientation('pointy')
            expect(Hex().isFlat()).to.be.false
        })
    })

    describe('size', () => {
        describe('when called without arguments', () => {
            it('returns the size of every hex', () => {
                Hex.size(5)
                expect(Hex.size()).to.equal(5)
            })
        })

        describe('when called with a valid size', () => {
            it('sets the size of every hex', () => {
                Hex.size(0)
                const hex1 = Hex()
                const hex2 = Hex()
                expect(Hex.size()).to.equal(0)
                expect(hex1.size()).to.equal(0)
                expect(hex2.size()).to.equal(0)
            })
        })

        describe('when called with an invalid size', () => {
            before(() => sinon.spy(console, 'warn'))
            after(() => console.warn.restore())

            it('shows a warning', () => {
                Hex.size('invalid')
                expect(console.warn).to.have.been.calledWith('Invalid size: invalid')
                Hex.size(-1)
                expect(console.warn).to.have.been.calledWith('Invalid size: -1')
                Hex.size(null)
                expect(console.warn).to.have.been.calledWith('Invalid size: null')
            })
        })
    })

    describe('oppositeCornerDistance', () => {
        it('returns the distance between two opposite corners of a hex', () => {
            Hex.size(10)
            expect(Hex.oppositeCornerDistance()).to.equal(20)
        })
    })

    describe('oppositeSideDistance', () => {
        it('returns the distance between two opposite sides of a hex', () => {
            Hex.size(10)
            expect(Hex.oppositeSideDistance()).to.be.closeTo(17.3, 0.5)
        })
    })

    describe('element', () => {
        describe('when called with a string', () => {
            it('sets the element for every hex', () => {
                Hex.element('<div></div>')
                expect(Hex().element()).to.equal('<div></div>')
            })
        })

        describe('when called with an element interpolator', () => {
            const elementInterpolator = sinon.spy((hex) => `hex x: ${hex.coordinates().x}`)

            it('sets the element interpolator for every hex', () => {
                Hex.element(elementInterpolator)
                const hex1 = Hex()
                const hex2 = Hex(1, 2)
                hex1.element()
                expect(elementInterpolator).to.have.been.calledWith(hex1)
                hex2.element()
                expect(elementInterpolator).to.have.been.calledWith(hex2)
            })

            describe('when called without arguments', () => {
                it('returns the interpolated element of every hex', () => {
                    Hex.element(elementInterpolator)
                    expect(Hex(4).element()).to.equal('hex x: 4')
                })
            })
        })
    })

    describe('width', () => {
        describe('when orientation is POINTY', () => {
            before(() => Hex.orientation('pointy'))

            it('returns Hex.oppositeSideDistance()', () => {
                Hex.size(10)
                expect(Hex.width()).to.equal(Hex.oppositeSideDistance())
            })
        })

        describe('when orientation is FLAT', () => {
            before(() => Hex.orientation('flat'))

            it('returns Hex.oppositeCornerDistance()', () => {
                Hex.size(10)
                expect(Hex.width()).to.equal(Hex.oppositeCornerDistance())
            })
        })
    })

    describe('height', () => {
        describe('when orientation is POINTY', () => {
            before(() => Hex.orientation('pointy'))

            it('returns Hex.oppositeCornerDistance()', () => {
                Hex.size(10)
                expect(Hex.height()).to.equal(Hex.oppositeCornerDistance())
            })
        })

        describe('when orientation is FLAT', () => {
            before(() => Hex.orientation('flat'))

            it('returns Hex.oppositeSideDistance()', () => {
                Hex.size(10)
                expect(Hex.height()).to.equal(Hex.oppositeSideDistance())
            })
        })
    })

    describe('center', () => {
        it('returns the relative center of the hex', () => {
            Hex.size(10)
            Hex.orientation('pointy')
            expect(Hex().center()).to.have.property('x').that.is.closeTo(8.7, 0.5)
            expect(Hex().center()).to.have.property('y').that.is.closeTo(10, 0.5)
        })
    })

    describe('origin', () => {
        describe('when called without arguments', () => {
            it('returns the origin of every hex', () => {
                Hex.origin([4, -2])
                expect(Hex.origin()).to.contain({ x: 4, y: -2 })
            })
        })

        describe('when called with a valid origin', () => {
            it('sets the origin of every hex', () => {
                Hex.origin([-1, 3])
                const hex1 = Hex()
                const hex2 = Hex()
                expect(Hex.origin()).to.contain({ x: -1, y: 3})
                expect(hex1.origin()).to.contain({ x: -1, y: 3})
                expect(hex2.origin()).to.contain({ x: -1, y: 3})
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
            const result = Hex(2.9, 2.2, -4.7).round()
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
        beforeEach(() => Hex.origin(Hex.center()))

        describe('when orientation is pointy', () => {
            before(() => Hex.orientation('pointy'))

            it('returns the point', () => {
                expect(Hex(2, 3).toPoint()).to.have.property('x').that.is.closeTo(51.9, 0.5)
                expect(Hex(2, 3).toPoint()).to.have.property('y').that.is.closeTo(35, 0.5)
            })
        })

        describe('when orientation is flat', () => {
            before(() => Hex.orientation('flat'))

            it('returns the point', () => {
                expect(Hex(2, 3).toPoint()).to.have.property('x').that.is.closeTo(20, 0.5)
                expect(Hex(2, 3).toPoint()).to.have.property('y').that.is.closeTo(60.6, 0.5)
            })
        })
    })

    describe('fromPoint', () => {
        before(() => Hex.size(20))

        describe('when orientation is pointy', () => {
            before(() => Hex.orientation('pointy'))

            it('returns the hex', () => {
                expect(Hex.fromPoint(Point(0, 0))).to.contain({ x: 0, y: 0 })
                expect(Hex.fromPoint(Point(20, 20))).to.contain({ x: 0, y: 1 })
                expect(Hex.fromPoint(Point(40, 40))).to.contain({ x: 1, y: 1 })
            })
        })

        describe('when orientation is flat', () => {
            before(() => Hex.orientation('flat'))

            it('returns the hex', () => {
                expect(Hex.fromPoint(Point(0, 0))).to.contain({ x: 0, y: 0 })
                expect(Hex.fromPoint(Point(20, 20))).to.contain({ x: 1, y: 0 })
                expect(Hex.fromPoint(Point(40, 40))).to.contain({ x: 1, y: 1 })
            })
        })
    })
})
