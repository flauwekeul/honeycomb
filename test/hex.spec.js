import { expect } from 'chai'
import Hex from '../src/hex'

describe('Hex', () => {
    describe('static methods', () => {
        describe('thirdDimension', () => {
            it('returns a third coordinate using the given two coordinates', () => {
                const result = Hex.thirdDimension(3, -1)
                expect(result).to.equal(-2)
            })
        })
    })

    describe('creation', () => {
        describe('with 2 axial coordinates', () => {
            it('returns a hex with the third coordinate set', () => {
                expect(Hex(3, 2)).to.contain({
                    x: 3,
                    y: 2,
                    z: -5
                })
            })
        })

        describe('with 3 cube coordinates', () => {
            it('returns a hex', () => {
                expect(Hex(3, 2, -5)).to.contain({
                    x: 3,
                    y: 2,
                    z: -5
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

        describe('hexesTo', () => {
            it('returns the hexes in a straight line between itself and the given hex, inclusive', () => {
                const result = Hex(0, 0, 0).hexesTo(Hex(1, -5, 4))
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
                const result = Hex(0, 0, 0).hexesTo(Hex(1, -1, 0))
                expect(result).to.eql([
                    Hex(0, 0, 0),
                    Hex(1, -1, 0)
                ])
            })
        })
    })
})
