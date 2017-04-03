import { expect } from 'chai'
import sinon from 'sinon'

import HexFactory from '../../src/hex'
import {
    DIRECTION_COORDINATES,
    DIAGONAL_DIRECTION_COORDINATES
} from '../../src/hex/constants'
import * as statics from '../../src/hex/statics'

const Hex = HexFactory()

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
        let hexesBetween

        before(() => {
            sinon.stub(Hex, 'distance')
            hexesBetween = statics.hexesBetweenFactory({ Hex })
        })

        after(() => Hex.distance.restore())

        it('calls Hex.distance', () => {
            hexesBetween()
            expect(Hex.distance).to.have.been.called
        })

        describe('when the distance between the passed hexes is 1', () => {
            before(() => Hex.distance.returns(1))

            it('returns the first and second hex in an array', () => {
                const firstHex = Hex()
                const secondHex = Hex()
                const result = hexesBetween(firstHex, secondHex)
                expect(result).to.eql([ firstHex, secondHex ])
            })
        })

        describe('when the distance between the passed hexes is > 1', () => {
            before(() => Hex.distance.callThrough())

            it('returns the hexes in a straight line between the first and second hex, inclusive', () => {
                const firstHex = Hex()
                const secondHex = Hex(1, -5, 4)
                const result = hexesBetween(firstHex, secondHex)
                expect(result).to.eql([
                    firstHex,
                    Hex(0, -1, 1),
                    Hex(0, -2, 2),
                    Hex(1, -3, 2),
                    Hex(1, -4, 3),
                    secondHex
                ])
            })
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
        let neighbor
        const hex = Hex()

        before(() => {
            sinon.spy(Hex, 'add')
            neighbor = statics.neighborFactory({ Hex })
        })

        after(() => Hex.add.restore())

        describe('of a given hex', () => {
            it('returns the result of calling Hex.add with the passed hex and DIRECTION_COORDINATES[0]', () => {
                const result = neighbor(hex)
                expect(Hex.add).to.have.been.calledWith(hex, DIRECTION_COORDINATES[0])
                expect(result).to.contain(DIRECTION_COORDINATES[0])
            })
        })

        describe('with a given direction between 0 and 5', () => {
            it('returns the neighboring hex in the given direction', () => {
                expect(neighbor(hex, 0)).to.contain(DIRECTION_COORDINATES[0])
                expect(neighbor(hex, 1)).to.contain(DIRECTION_COORDINATES[1])
                expect(neighbor(hex, 2)).to.contain(DIRECTION_COORDINATES[2])
                expect(neighbor(hex, 3)).to.contain(DIRECTION_COORDINATES[3])
                expect(neighbor(hex, 4)).to.contain(DIRECTION_COORDINATES[4])
                expect(neighbor(hex, 5)).to.contain(DIRECTION_COORDINATES[5])
            })
        })

        describe('with a given direction < 0 or > 5', () => {
            it('returns the neighboring hex in the given direction after getting the direction\'s remainder', () => {
                expect(neighbor(hex, 6)).to.contain(DIRECTION_COORDINATES[0])
                expect(neighbor(hex, 92)).to.contain(DIRECTION_COORDINATES[2])
                expect(neighbor(hex, -4)).to.contain(DIRECTION_COORDINATES[4])
            })
        })

        describe('with the diagonal flag enabled', () => {
            it('returns the diagonally neighboring hex in the given direction', () => {
                expect(neighbor(hex, 3, true)).to.contain(DIAGONAL_DIRECTION_COORDINATES[3])
            })
        })
    })

    describe('distance', () => {
        let distance

        before(() => {
            sinon.spy(Hex, 'subtract')
            distance = statics.distanceFactory({ Hex })
        })

        after(() => Hex.subtract.restore())

        it('calls Hex.subtract', () => {
            const firstHex = Hex()
            const secondHex = Hex()
            distance(firstHex, secondHex)
            expect(Hex.subtract).to.have.been.calledWith(firstHex, secondHex)
        })

        it('returns the amount of hexes between the passed hexes', () => {
            const result = distance(Hex(0, -3, 3), Hex(2, 1, -3))
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
