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

        describe('when called with an N or S direction', () => {
            it('returns null', () => {
                expect(_toNumberDirection('N', orientation)).to.be.null
                expect(_toNumberDirection('S', orientation)).to.be.null
            })
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

        describe('when called with an E or W direction', () => {
            it('returns null', () => {
                expect(_toNumberDirection('E', orientation)).to.be.null
                expect(_toNumberDirection('W', orientation)).to.be.null
            })
        })
    })
})
