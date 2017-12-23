import { expect } from 'chai'

import Grid from '../../src/grid'
import extendHex from '../../src/hex'

describe('Grid', function() {
    describe('when not passed a function', function() {
        it('throws an error', function() {
            expect(() => Grid()).to.throw(Error, 'Hex is not a function: undefined.')
            expect(() => Grid('invalid')).to.throw(Error, 'Hex is not a function: invalid.')
        })
    })

    it('returns an object with the Grid methods', function() {
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
