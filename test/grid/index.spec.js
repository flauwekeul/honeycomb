import { expect } from 'chai'
import sinon from 'sinon'

import HexFactory from '../../src/hex'
import GridFactory from '../../src/grid'

describe('Grid', () => {
    const HexFactorySpy = sinon.spy(HexFactory)
    const Grid = GridFactory({ HexFactory: HexFactorySpy })

    it('returns an object with the Grid methods', () => {
        const result = Grid()
        const methodCount = Object.keys(result).length

        expect(result).to.be.an('object')
        expect(methodCount).to.equal(8)
        expect(result).to.have.property('pointToHex')
        expect(result).to.have.property('hexToPoint')
        expect(result).to.have.property('colSize')
        expect(result).to.have.property('rowSize')
        expect(result).to.have.property('parallelogram')
        expect(result).to.have.property('triangle')
        expect(result).to.have.property('hexagon')
        expect(result).to.have.property('rectangle')
    })

    describe('when passed hex settings', () => {
        it('passes the hex settings through to HexFactory', () => {
            const hexSettings = { thisIs: 'a setting' }
            Grid(hexSettings)
            expect(HexFactorySpy).to.have.been.calledWith(hexSettings)
        })
    })
})
