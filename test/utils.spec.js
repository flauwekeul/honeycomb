import { expect } from 'chai'

import { _toNumberDirection, _signedModulo } from '../src/utils'

describe('_signedModulo', () => {
    describe('when called with a negative dividend', () => {
        it('returns the modulo mirrored from the divider(?)', () => {
            expect(_signedModulo(1, 6)).to.equal(1)
            expect(_signedModulo(-1, 6)).to.equal(5)
        })
    })
})

describe('_toNumberDirection', () => {
    let orientation

    describe('when called with an invalid compass direction', () => {
        it('throws', () => {
            expect(() => _toNumberDirection('invalid')).to.throw(
                'Invalid compass direction: invalid. Choose from E, SE, S, SW, W, NW, N or NE.'
            )
        })
    })

    describe('when called with an ambiguous compass direction', () => {
        it('throws', () => {
            expect(() => _toNumberDirection('N', 'pointy')).to.throw(
                `Direction N is ambiguous for pointy hexes. Did you mean NE or NW?`
            )
            expect(() => _toNumberDirection('S', 'pointy')).to.throw(
                `Direction S is ambiguous for pointy hexes. Did you mean SE or SW?`
            )
            expect(() => _toNumberDirection('E', 'flat')).to.throw(
                `Direction E is ambiguous for flat hexes. Did you mean NE or SE?`
            )
            expect(() => _toNumberDirection('W', 'flat')).to.throw(
                `Direction W is ambiguous for flat hexes. Did you mean NW or SW?`
            )
        })
    })

    describe('when called with a pointy orientation', () => {
        before(() => {
            orientation = 'pointy'
        })

        it('converts a compass direction to a number direction', () => {
            expect(_toNumberDirection('E', orientation)).to.equal(0)
            expect(_toNumberDirection('SE', orientation)).to.equal(1)
            expect(_toNumberDirection('SW', orientation)).to.equal(2)
            expect(_toNumberDirection('W', orientation)).to.equal(3)
            expect(_toNumberDirection('NW', orientation)).to.equal(4)
            expect(_toNumberDirection('NE', orientation)).to.equal(5)
        })
    })

    describe('when called with a flat orientation', () => {
        before(() => {
            orientation = 'flat'
        })

        it('converts a compass direction to a number direction', () => {
            expect(_toNumberDirection('SE', orientation)).to.equal(0)
            expect(_toNumberDirection('S', orientation)).to.equal(1)
            expect(_toNumberDirection('SW', orientation)).to.equal(2)
            expect(_toNumberDirection('NW', orientation)).to.equal(3)
            expect(_toNumberDirection('N', orientation)).to.equal(4)
            expect(_toNumberDirection('NE', orientation)).to.equal(5)
        })
    })
})
