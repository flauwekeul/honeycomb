import { expect } from 'chai'
import sinon from 'sinon'

import extendHex from '../../src/hex'
import GridFactory from '../../src/grid'

describe('Grid', function() {
    const extendHexSpy = sinon.spy(extendHex)
    const Grid = GridFactory({ extendHex: extendHexSpy })

    it('returns an object with the Grid methods', function() {
        const result = Grid()
        const properties = Object.keys(result).length

        expect(result).to.be.an('object')
        expect(properties).to.equal(9)
        expect(result).to.have.property('Hex').that.is.a('function')
        expect(result).to.have.property('pointToHex')
        expect(result).to.have.property('hexToPoint')
        expect(result).to.have.property('colSize')
        expect(result).to.have.property('rowSize')
        expect(result).to.have.property('parallelogram')
        expect(result).to.have.property('triangle')
        expect(result).to.have.property('hexagon')
        expect(result).to.have.property('rectangle')
    })

    describe('when passed hex settings', function() {
        it('passes the hex settings through to extendHex', function() {
            const hexSettings = { thisIs: 'a setting' }
            Grid(hexSettings)
            expect(extendHexSpy).to.have.been.calledWith(hexSettings)
        })
    })
})
