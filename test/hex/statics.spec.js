import { expect } from 'chai'
import Hex from '../../src/hex'

describe('Hex static methods', () => {
    describe('thirdDimension', () => {
        it('returns a third coordinate using the given two coordinates', () => {
            const result = Hex.thirdDimension(3, -1)
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
        it('returns the hexes in a straight line between the two given hexes, inclusive', () => {
            const coordinates = Hex.hexesBetween(Hex(0, 0, 0), Hex(1, -5, 4))
                .map(hex => {
                    const { q, r, s } = hex
                    return { q, r, s }
                })
            expect(coordinates).to.eql([
                { q: 0, r: 0, s: 0 },
                { q: 0, r: -1, s: 1 },
                { q: 0, r: -2, s: 2 },
                { q: 1, r: -3, s: 2 },
                { q: 1, r: -4, s: 3 },
                { q: 1, r: -5, s: 4 }
            ])
        })

        it('returns early if the given hex is its neighbor', () => {
            const coordinates = Hex.hexesBetween(Hex(0, 0, 0), Hex(1, -1, 0))
                .map(hex => {
                    const { q, r, s } = hex
                    return { q, r, s }
                })
            expect(coordinates).to.eql([
                { q: 0, r: 0, s: 0 },
                { q: 1, r: -1, s: 0 }
            ])
        })
    })
})
