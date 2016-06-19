import { expect } from 'chai'
import Hex from '../../src/hex'

describe('Hex static methods', () => {
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
        it('returns the hexes in a straight line between the two given hexes, inclusive', () => {
            const coordinates = Hex.hexesBetween(Hex(0, 0, 0), Hex(1, -5, 4)).map(hex => hex.coordinates())
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
            const coordinates = Hex.hexesBetween(Hex(0, 0, 0), Hex(1, -1, 0)).map(hex => hex.coordinates())
            expect(coordinates).to.eql([
                { x: 0, y: 0, z: 0 },
                { x: 1, y: -1, z: 0 }
            ])
        })
    })
})
