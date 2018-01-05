import { expect } from 'chai'
import sinon from 'sinon'

import createHexFactory from '../../src/hex'
import createGridFactoryFactory from '../../src/grid'
import * as methods from '../../src/grid/prototype'

const Hex = createHexFactory()
const GridFactory = createGridFactoryFactory({ createHexFactory })(Hex)

describe('get', () => {
    describe('when present in the grid', () => {
        it('returns the passed hex', () => {
            const targetHex = Hex(3, -2)
            const get = methods.get.bind(GridFactory(targetHex))
            const result = get(Hex(3, -2))

            expect(result).to.equal(targetHex)
        })
    })

    describe('when not present in the grid', () => {
        it('returns the passed hex', () => {
            const targetHex = Hex(3, -2)
            const get = methods.get.bind(GridFactory(targetHex))
            const result = get(Hex())

            expect(result).to.be.undefined
        })
    })
})

describe('hexesBetween', () => {
    it(`calls the passed firstHex.distance()`, () => {
        const distance = sinon.stub()
        const firstHex = { distance }
        const lastHex = 'last hex'
        methods.hexesBetween(firstHex, lastHex)

        expect(distance).to.have.been.calledWith(lastHex)
    })

    it('calls firstHex.nudge(), firstHex.lerp(), lastHex.nudge() and firstHex.round() for each hex between firstHex and lastHex', () => {
        const round = sinon.stub().returns('round result')
        const lerp = sinon.stub().returns({ round })
        const firstHexNudge = sinon.stub().returns({ lerp })
        const lastHexNudge = sinon.stub().returns('last hex nudge result')
        const distance = sinon.stub().returns(2)
        const firstHex = { distance, nudge: firstHexNudge }
        const lastHex = { nudge: lastHexNudge }
        const get = sinon.stub().returns('get result')
        const hexesBetween = methods.hexesBetween.bind({ get })
        const result = hexesBetween(firstHex, lastHex)

        expect(firstHexNudge).to.have.callCount(3)
        expect(lerp).to.have.callCount(3)
        expect(lerp).to.always.have.been.calledWith('last hex nudge result', sinon.match.number)
        expect(lastHexNudge).to.have.callCount(3)
        expect(round).to.have.callCount(3)
        expect(get).to.have.callCount(3)
        expect(get).to.always.have.been.calledWith('round result')
        expect(result).to.eql(['get result', 'get result', 'get result'])
    })

    describe('when all hexes between firstHex and lastHex are present in the grid', () => {
        it('returns the hexes in a straight line, inclusive', () => {
            const grid = GridFactory.hexagon({ radius: 6 })
            const firstHex = Hex()
            const lastHex = Hex(1, -5, 4)
            const result = grid.hexesBetween(firstHex, lastHex)
            expect(result).to.eql([
                firstHex,
                Hex(0, -1, 1),
                Hex(0, -2, 2),
                Hex(1, -3, 2),
                Hex(1, -4, 3),
                lastHex
            ])
        })
    })

    describe('when some hexes between firstHex and lastHex are missing in the grid', () => {
        it('returns any present hexes in a straight line, inclusive', () => {
            const grid = GridFactory.hexagon({ radius: 4 })
            const firstHex = Hex(0, -1)
            const lastHex = Hex(1, -5, 4)
            const result = grid.hexesBetween(firstHex, lastHex)
            expect(result).to.eql([
                firstHex,
                Hex(0, -2, 2),
                Hex(1, -3, 2),
                undefined,
                undefined
            ])
        })
    })
})
