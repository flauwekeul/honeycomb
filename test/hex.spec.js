import { expect } from 'chai'

import Hex from '../src/hex'
import {
    DIRECTION_COORDINATES,
    DIAGONAL_DIRECTION_COORDINATES
} from '../src/constants'

describe('Hex', () => {
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

    describe('add', () => {
        it('adds all coordinates of the given hex to itself', () => {
            const result = Hex(1, -3, 2).add(Hex(2, 0, -2))
            expect(result).to.deep.equal(Hex(3, -3, 0))
        })
    })

    describe('subtract', () => {
        it('subtracts all coordinates of given hex from itself', () => {
            const result = Hex(1, -3, 2).subtract(Hex(2, 0, -2))
            expect(result).to.deep.equal(Hex(-1, -3, 4))
        })
    })

    describe('neighbor', () => {
        describe('without arguments', () => {
            it('returns the neighboring hex in direction 0', () => {
                const result = Hex(-5, -2, 7).neighbor()
                expect(result).to.deep.equal(Hex(-4, -2, 6))
            })
        })

        describe('with a given direction', () => {
            it('returns the neighboring hex in the given direction', () => {
                const result = Hex(-5, -2, 7).neighbor(3)
                expect(result).to.deep.equal(Hex(-6, -2, 8))
            })
        })

        describe('with the diagonal flag enabled', () => {
            it('returns the diagonally neighboring hex in the given direction', () => {
                const result = Hex(-5, -2, 7).neighbor(5, true)
                expect(result).to.deep.equal(Hex(-4, -1, 5))
            })
        })
    })

    describe('distance', () => {
        it('returns the amount of hexes from itself to the given hex', () => {
            const result = Hex(0, -3, 3).distance(Hex(2, 1, -3))
            expect(result).to.equal(6)
        })
    })
})
