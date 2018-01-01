import { expect } from 'chai'
import sinon from 'sinon'

import Grid from '../../src/grid/class'
import createHexFactory from '../../src/hex'

const Hex = createHexFactory()

describe('Grid class', () => {
    let instance

    beforeEach(() => {
        instance = new Grid(Hex(0))
    })

    it('extends Array', () => {
        expect(new Grid()).to.be.an.instanceOf(Array)
    })

    describe('Grid.isValidHex', () => {
        it('returns whether the passed value has the __isHoneycombHex property', () => {
            expect(Grid.isValidHex(Hex())).to.be.true

            expect(Grid.isValidHex()).to.be.false
            expect(Grid.isValidHex(undefined)).to.be.false
            expect(Grid.isValidHex(null)).to.be.false
            expect(Grid.isValidHex(42)).to.be.false
            expect(Grid.isValidHex('string')).to.be.false
            expect(Grid.isValidHex([])).to.be.false
            expect(Grid.isValidHex({})).to.be.false
            expect(Grid.isValidHex(true)).to.be.false
        })
    })
})
