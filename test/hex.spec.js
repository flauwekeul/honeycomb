import { expect } from 'chai'
import Hex from '../src/hex'
import Point from '../src/point'
import { ORIENTATIONS } from '../src/hex/constants'

describe('Hex', () => {
    describe('static methods', () => {
        describe('thirdDimension', () => {
            it('returns a third coordinate using the given two coordinates', () => {
                const result = Hex.thirdDimension(3, -1)
                expect(result).to.equal(-2)
            })
        })

        describe('orientation', () => {
            describe('when called without arguments', () => {
                describe('when called for the first time', () => {
                    it('returns the default FLAT orientation', () => {
                        expect(Hex.orientation()).to.equal(ORIENTATIONS.FLAT)
                    })
                })

                describe('when already set', () => {
                    beforeEach(() => { Hex.orientation('pointy') })

                    it('returns the orientation of Hex', () => {
                        expect(Hex.orientation()).to.equal(ORIENTATIONS.POINTY)
                    })
                })
            })

            describe('when called with a valid orientation', () => {
                it('sets and returns the orientation of Hex', () => {
                    expect(Hex.orientation('pointy')).to.equal(ORIENTATIONS.POINTY)
                    expect(Hex.orientation()).to.equal(ORIENTATIONS.POINTY)
                    expect(Hex.orientation('flat')).to.equal(ORIENTATIONS.FLAT)
                    expect(Hex.orientation()).to.equal(ORIENTATIONS.FLAT)
                })
            })

            describe('when called with an invalid orientation', () => {
                it('doesn\'t change the orientation of Hex', () => {
                    Hex.orientation(ORIENTATIONS.POINTY)
                    Hex.orientation('invalid')
                    expect(Hex.orientation()).to.equal(ORIENTATIONS.POINTY)
                })
            })
        })

        describe('isPointy', () => {
            it('returns whether Hex.orientation() is POINTY', () => {
                Hex.orientation('point')
                expect(Hex.isPointy()).to.be.true
                Hex.orientation('flat')
                expect(Hex.isPointy()).to.be.false
            })
        })

        describe('isFlat', () => {
            it('returns whether Hex.orientation() is FLAT', () => {
                Hex.orientation('flat')
                expect(Hex.isFlat()).to.be.true
                Hex.orientation('pointy')
                expect(Hex.isFlat()).to.be.false
            })
        })

        describe('size', () => {
            describe('when called without arguments', () => {
                describe('when called for the first time', () => {
                    it('returns the default size of 1', () => {
                        expect(Hex.size()).to.equal(1)
                    })
                })

                describe('when already set', () => {
                    beforeEach(() => { Hex.size(10) })

                    it('returns the size of Hex', () => {
                        expect(Hex.size()).to.equal(10)
                    })
                })
            })

            describe('when called with a valid size', () => {
                it('sets and returns the size of Hex', () => {
                    expect(Hex.size(0)).to.equal(0)
                    expect(Hex.size()).to.equal(0)
                    expect(Hex.size(100)).to.equal(100)
                    expect(Hex.size()).to.equal(100)
                })
            })

            describe('when called with an invalid size', () => {
                it('doesn\'t change the size of Hex', () => {
                    Hex.size(20)
                    Hex.size('invalid')
                    expect(Hex.size()).to.equal(20)
                    Hex.size(-1)
                    expect(Hex.size()).to.equal(20)
                })
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

        describe('oppositeCornerDistance', () => {
            it('returns the distance between two opposite points', () => {
                Hex.size(10)
                expect(Hex.oppositeCornerDistance()).to.equal(20)
            })
        })

        describe('oppositeSideDistance', () => {
            it('returns the distance between two opposite sides', () => {
                Hex.size(10)
                expect(Hex.oppositeSideDistance()).to.be.closeTo(17.3205, 0.0005)
            })
        })

        describe('width', () => {
            describe('when orientation is POINTY', () => {
                beforeEach(() => Hex.orientation('pointy'))

                it('returns Hex.oppositeSideDistance()', () => {
                    Hex.size(10)
                    expect(Hex.width()).to.equal(Hex.oppositeSideDistance())
                })
            })

            describe('when orientation is FLAT', () => {
                beforeEach(() => Hex.orientation('flat'))

                it('returns Hex.oppositeCornerDistance()', () => {
                    Hex.size(10)
                    expect(Hex.width()).to.equal(Hex.oppositeCornerDistance())
                })
            })
        })

        describe('height', () => {
            describe('when orientation is POINTY', () => {
                beforeEach(() => Hex.orientation('pointy'))

                it('returns Hex.oppositeCornerDistance()', () => {
                    Hex.size(10)
                    expect(Hex.height()).to.equal(Hex.oppositeCornerDistance())
                })
            })

            describe('when orientation is FLAT', () => {
                beforeEach(() => Hex.orientation('flat'))

                it('returns Hex.oppositeSideDistance()', () => {
                    Hex.size(10)
                    expect(Hex.height()).to.equal(Hex.oppositeSideDistance())
                })
            })
        })

        describe('hexesBetween', () => {
            it('returns the hexes in a straight line between the two given hexes, inclusive', () => {
                const result = Hex.hexesBetween(Hex(0, 0, 0), Hex(1, -5, 4))
                expect(result).to.eql([
                    Hex(0, 0, 0),
                    Hex(0, -1, 1),
                    Hex(0, -2, 2),
                    Hex(1, -3, 2),
                    Hex(1, -4, 3),
                    Hex(1, -5, 4)
                ])
            })

            it('returns early if the given hex is its neighbor', () => {
                const result = Hex.hexesBetween(Hex(0, 0, 0), Hex(1, -1, 0))
                expect(result).to.eql([
                    Hex(0, 0, 0),
                    Hex(1, -1, 0)
                ])
            })
        })
    })

    describe('creation', () => {
        describe('with 3 parameters of type Number', () => {
            it('returns a hex', () => {
                expect(Hex(3, 2, -5)).to.contain({
                    x: 3,
                    y: 2,
                    z: -5
                })
            })
        })

        describe('with 2 parameters of type Number', () => {
            it('returns a hex with the z coordinate set as -x - y', () => {
                expect(Hex(3, 2)).to.contain({
                    x: 3,
                    y: 2,
                    z: -5
                })
            })
        })

        describe('with 1 parameter of type Number', () => {
            it('returns a hex with the y coordinate set to x and the z coordinate set as -x - y', () => {
                expect(Hex(3)).to.contain({
                    x: 3,
                    y: 3,
                    z: -6
                })
            })
        })

        describe('without parameters', () => {
            it('returns a hex with all coordinates set to 0', () => {
                expect(Hex()).to.contain({
                    x: 0,
                    y: 0,
                    z: 0
                })
            })
        })
    })

    describe('instance methods', () => {
        describe('add', () => {
            it('adds all coordinates of the given hex to itself', () => {
                const result = Hex(1, -3, 2).add(Hex(2, 0, -2))
                expect(result).to.eql(Hex(3, -3, 0))
            })
        })

        describe('subtract', () => {
            it('subtracts all coordinates of given hex from itself', () => {
                const result = Hex(1, -3, 2).subtract(Hex(2, 0, -2))
                expect(result).to.eql(Hex(-1, -3, 4))
            })
        })

        describe('neighbor', () => {
            describe('without arguments', () => {
                it('returns the neighboring hex in direction 0', () => {
                    const result = Hex(-5, -2, 7).neighbor()
                    expect(result).to.eql(Hex(-4, -2, 6))
                })
            })

            describe('with a given direction', () => {
                it('returns the neighboring hex in the given direction', () => {
                    const result = Hex(-5, -2, 7).neighbor(3)
                    expect(result).to.eql(Hex(-6, -2, 8))
                })
            })

            describe('with the diagonal flag enabled', () => {
                it('returns the diagonally neighboring hex in the given direction', () => {
                    const result = Hex(-5, -2, 7).neighbor(5, true)
                    expect(result).to.eql(Hex(-4, -1, 5))
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
                expect(result).to.eql(Hex(3, 2, -5))
            })
        })

        describe('lerp', () => {
            it('returns an interpolation between itself and the passed hex for a `t` between 0..1', () => {
                const result = Hex(0, 0, 0).lerp(Hex(4, -5, 1), 0.5)
                expect(result).to.eql(Hex(2, -2.5, 0.5))
            })
        })

        describe('nudge', () => {
            it('returns itself with a tiny offset', () => {
                const result = Hex(-2, 6, -4).nudge()
                expect(result).to.eql(Hex(-1.999999, 6.000001, -4.000002))
            })
        })

        // disabled because it seems broken
        xdescribe('toPoint', () => {
            describe('when orientation is pointy', () => {
                beforeEach(Hex.orientation('pointy'))

                it('returns the center point of the hex', () => {
                    const result = Hex(1, -1, 0).toPoint()
                    expect(result).to.eql(Point(10, 10))
                })
            })

            describe('when orientation is flat', () => {
                beforeEach(Hex.orientation('flat'))

                it('returns the center point of the hex')
            })
        })
    })
})
