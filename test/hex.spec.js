import { expect } from 'chai'

import Hex from '../src/hex'

describe('Hex', () => {
    describe('when created with 2 axial coordinates', () => {
        it('returns a hex with the third coordinate set', () => {
            expect(Hex(3, 2)).to.contain({
                q: 3,
                r: 2,
                s: -5
            })
        })
    })
    describe('when created with 3 cube coordinates', () => {
        it('returns a hex', () => {
            expect(Hex(3, 2, -5)).to.contain({
                q: 3,
                r: 2,
                s: -5
            })
        })
    })
})
