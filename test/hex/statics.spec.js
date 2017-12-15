import { expect } from 'chai'
import sinon from 'sinon'

import * as statics from '../../src/hex/statics'

describe('Hex static methods', function() {
    describe('thirdCoordinate', function() {
        it('returns the result of (-firstCoordinate - secondCoordinate)', function() {
            const unsignNegativeZero = sinon.stub().returns('result')
            const thirdCoordinate = statics.thirdCoordinateFactory({ unsignNegativeZero })
            const result = thirdCoordinate(3, -1)

            expect(unsignNegativeZero).to.have.been.calledWith(-2)
            expect(result).to.equal('result')
        })
    })
})
