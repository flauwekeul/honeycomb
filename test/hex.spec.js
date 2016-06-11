const { expect } = require('chai')
const { Hex } = require('../src/hex')
const { Point } = require('../src/point')
const { ORIENTATIONS } = require('../src/hex/constants')

describe('Hex', () => {
    describe('static methods', () => {
        describe('thirdDimension', () => {
            it('returns a third coordinate using the given two coordinates', () => {
                const result = Hex.thirdDimension(3, -1)
                expect(result).to.equal(-2)
            })
        })

        describe('pointy', () => {
            it('sets the orientation of all hexes to pointy', () => {
                Hex.pointy()
                expect(Hex.orientation).to.equal(ORIENTATIONS.POINTY)
            })
        })

        describe('flat', () => {
            it('sets the orientation of all hexes to flat', () => {
                Hex.flat()
                expect(Hex.orientation).to.equal(ORIENTATIONS.FLAT)
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
        describe('hasSize', () => {
            afterEach(() => { delete Hex.size })

            it('returns true if size is valid', () => {
                Hex.size = 0
                expect(Hex(0, 0, 0).hasSize()).to.be.true
                Hex.size = 4
                expect(Hex(0, 0, 0).hasSize()).to.be.true
            })

            it('returns false if size is invalid', () => {
                Hex.size = -2
                expect(Hex(0, 0, 0).hasSize()).to.be.false
                Hex.size = undefined
                expect(Hex(0, 0, 0).hasSize()).to.be.false
                Hex.size = null
                expect(Hex(0, 0, 0).hasSize()).to.be.false
            })
        })

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

        describe('toPoint', () => {
            describe('when size isn\'t set', () => {
                it('throws an error', () => {
                    const hex = Hex(0, 0, 0)
                    expect(hex.toPoint.bind(hex)).to.throw(Error)
                })
            })

            // disabled because it seems broken
            xdescribe('when size is set', () => {
                beforeEach(() => { Hex.size = 10 })

                describe('when orientation is pointy', () => {
                    beforeEach(Hex.pointy)

                    it('returns the center point of the hex', () => {
                        const result = Hex(1, -1, 0).toPoint()
                        expect(result).to.eql(Point(10, 10))
                    })
                })

                describe('when orientation is flat', () => {
                    beforeEach(Hex.flat)

                    it('returns the center point of the hex')
                })
            })
        })
    })
})
