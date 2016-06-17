import { expect } from 'chai'
import Hex from '../../src/hex'

describe('Hex', () => {
    describe('prototype', () => {
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
