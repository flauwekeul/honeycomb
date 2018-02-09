/* eslint-env mocha */

import { expect } from 'chai'

import * as statics from './statics'

describe('Hex static methods', function() {
    describe('thirdCoordinate', function() {
        it('returns the result of -firstCoordinate - secondCoordinate', function() {
            expect(statics.thirdCoordinate(3, -1)).to.equal(-2)
        })
    })
})
