import { expect } from 'chai'
import sinon from 'sinon'

import GridFactory from '../../src/grid'
import extendHex from '../../src/hex'

describe('Grid', function() {
    describe('when not passed a function', function() {
        it('calls extendHex() to create a default Hex factory', function() {
            const extendHexSpy = sinon.spy(extendHex)
            const Grid = GridFactory({ extendHex: extendHexSpy })
            Grid()
            expect(extendHexSpy).to.have.been.called
        })
    })

    it('returns an object with the Grid methods', function() {
        const Grid = GridFactory({ extendHex })
        const Hex = extendHex()
        const result = Grid(Hex)
        const properties = Object.keys(result).length

        expect(result).to.be.an('object')
        expect(properties).to.equal(9)
        expect(result).to.have.property('Hex').that.eqls(Hex)
        expect(result).to.have.property('pointToHex')
        expect(result).to.have.property('hexToPoint')
        expect(result).to.have.property('colSize')
        expect(result).to.have.property('rowSize')
        expect(result).to.have.property('parallelogram')
        expect(result).to.have.property('triangle')
        expect(result).to.have.property('hexagon')
        expect(result).to.have.property('rectangle')
    })
})
