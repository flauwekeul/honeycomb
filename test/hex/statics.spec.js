import { expect } from 'chai'
import Hex from '../../src/hex'
import { ORIENTATIONS } from '../../src/hex/constants'

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
})
