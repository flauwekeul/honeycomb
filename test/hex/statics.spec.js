import { expect } from 'chai'
import sinon from 'sinon'

import { unsignNegativeZero } from '../../src/utils'
import Hex from '../../src/hex'
import * as statics from '../../src/hex/statics'

describe('Hex static methods', () => {
    describe('thirdCoordinate', () => {
        it('returns the result of (-firstCoordinate - secondCoordinate)', () => {
            const unsignNegativeZero = sinon.stub().returns('result')
            const thirdCoordinate = statics.thirdCoordinateFactory({ unsignNegativeZero })
            const result = thirdCoordinate(3, -1)

            expect(unsignNegativeZero).to.have.been.calledWith(-2)
            expect(result).to.equal('result')
        })
    })

    describe('isValidSize', () => {
        it('returns true if passed size is valid', () => {
            expect(statics.isValidSize(0)).to.be.true
            expect(statics.isValidSize(4)).to.be.true
        })

        it('returns false if passed size is invalid', () => {
            expect(statics.isValidSize(-2)).to.be.false
            expect(statics.isValidSize(undefined)).to.be.false
            expect(statics.isValidSize(null)).to.be.false
        })
    })

    describe('hexesBetween', () => {
        it('returns the hexes in a straight line between the first and second hex, inclusive', () => {
            expect(statics.hexesBetween(Hex(), Hex(1, -5, 4))).to.deep.include.members([
                Hex(0, 0, 0),
                Hex(0, -1, 1),
                Hex(0, -2, 2),
                Hex(1, -3, 2),
                Hex(1, -4, 3),
                Hex(1, -5, 4)
            ])
        })
    })

    describe('add', () => {
        it('returns a new hex where the coordinates are the sum of both passed hexes', () => {
            const HexSpy = sinon.spy(Hex)
            const add = statics.addFactory({ Hex: HexSpy })
            const result = add(Hex(1, -3, 2), Hex(2, 0, -2))

            expect(HexSpy).to.have.been.calledWith(3, -3, 0)
            expect(result).to.contain({ x: 3, y: -3, z: 0 })
        })
    })

    describe('subtract', () => {
        it('returns a new hex where the coordinates are the difference between both passed hexes', () => {
            const HexSpy = sinon.spy(Hex)
            const subtract = statics.subtractFactory({ Hex: HexSpy })
            const result = subtract(Hex(1, -3, 2), Hex(2, 0, -2))

            expect(HexSpy).to.have.been.calledWith(-1, -3, 4)
            expect(result).to.contain({ x: -1, y: -3, z: 4 })
        })
    })

    describe('neighbor', () => {
        describe('of a given hex', () => {
            it('returns the neighboring hex in direction 0', () => {
                const result = statics.neighbor(Hex(-5, -2, 7))
                expect(result).to.contain({ x: -4, y: -3, z: 7 })
            })
        })

        describe('with a given direction between 0 and 6', () => {
            it('returns the neighboring hex in the given direction', () => {
                const result = statics.neighbor(Hex(-5, -2, 7), 3)
                expect(result).to.contain({ x: -6, y: -1, z: 7 })
            })
        })

        describe('with a given direction > 5', () => {
            it('returns the neighboring hex in the given direction after getting the direction\'s remainder', () => {
                const result = statics.neighbor(Hex(-5, -2, 7), 38)
                expect(result).to.contain({ x: -5, y: -1, z: 6 })
            })
        })

        describe('with the diagonal flag enabled', () => {
            it('returns the diagonally neighboring hex in the given direction', () => {
                const result = statics.neighbor(Hex(-5, -2, 7), 5, true)
                expect(result).to.contain({ x: -4, y: -4, z: 8 })
            })
        })
    })

    describe('distance', () => {
        it('returns the amount of hexes between the passed hexes', () => {
            const result = statics.distance(Hex(0, -3, 3), Hex(2, 1, -3))
            expect(result).to.equal(6)
        })
    })

    describe('round', () => {
        it('rounds floating point coordinates to their nearest integer coordinates', () => {
            const HexSpy = sinon.spy(Hex)
            const round = statics.roundFactory({ Hex: HexSpy })
            const result = round(Hex(2.9, 2.2, -4.7))

            expect(HexSpy).to.have.been.calledWith(3, 2, -5)
            expect(result).to.contain({ x: 3, y: 2, z: -5 })
        })
    })

    describe('lerp', () => {
        it('returns an interpolation between the passed hexes for a `t` between 0..1', () => {
            const HexSpy = sinon.spy(Hex)
            const lerp = statics.lerpFactory({ Hex: HexSpy })
            const result = lerp(Hex(0, 0, 0), Hex(4, -5, 1), 0.5)

            expect(HexSpy).to.have.been.calledWith(2, -2.5, 0.5)
            expect(result).to.contain({ x: 2, y: -2.5, z: 0.5 })
        })
    })

    describe('nudge', () => {
        it('returns the passed hex with a tiny offset', () => {
            const nudge = statics.nudgeFactory({ Hex })
            const result = nudge(Hex(-2, 6, -4))
            expect(result).to.contain({ x: -1.999999, y: 6.000001, z: -4.000002 })
        })
    })
})
