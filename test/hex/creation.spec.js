import { expect } from 'chai'
import Hex from '../../src/hex'

describe('Hex creation', () => {
    describe('with 3 numbers', () => {
        it('sets them as cube coordinates in the order x, y, z', () => {
            expect(Hex(3, -5, 2)).to.contain({ x: 3, y: -5, z: 2 })
        })

        describe('when x, y and z summed and rounded don\'t equal 0', () => {
            it('throws an error', () => {
                expect(() => Hex(3, -5, 8)).to.throw(Error, 'Coordinates don\'t sum to 0: { x: 3, y: -5, z: 8 }.')
            })
        })
    })

    describe('with 2 numbers', () => {
        it('sets the missing coordinate', () => {
            expect(Hex(3, 2, null)).to.contain({ x: 3, y: 2, z: -5 })
            expect(Hex(3, null, 2)).to.contain({ x: 3, y: -5, z: 2 })
            expect(Hex(null, 3, 2)).to.contain({ x: -5, y: 3, z: 2 })
        })
    })

    describe('with 1 number', () => {
        it('sets the first missing coordinate (in the order x, y, z) to the provided coordinate', () => {
            expect(Hex(3, null, null)).to.contain({ x: 3, y: 3, z: -6 })
            expect(Hex(null, 3, null)).to.contain({ x: 3, y: 3, z: -6 })
            expect(Hex(null, null, 3)).to.contain({ x: 3, y: -6, z: 3 })
        })
    })

    describe('with an object containing x, y and z', () => {
        it('sets the coordinates', () => {
            expect(Hex({ x: 3, y: 2, z: -5 })).to.contain({ x: 3, y: 2, z: -5 })
        })
    })

    describe('with an object containing 2 coordinates (from x, y and z)', () => {
        it('calculates the third coordinate and sets all 3', () => {
            expect(Hex({ x: 3, y: 0 })).to.contain({ x: 3, y: 0, z: -3 })
            expect(Hex({ x: 3, z: 0 })).to.contain({ x: 3, y: -3, z: 0 })
            expect(Hex({ y: 3, z: 0 })).to.contain({ x: -3, y: 3, z: 0 })
        })
    })

    describe('with an object containing 1 coordinate (from x, y and z)', () => {
        it('sets the missing coordinates', () => {
            expect(Hex({ x: 3 })).to.contain({ x: 3, y: 3, z: -6 })
            expect(Hex({ y: 3 })).to.contain({ x: 3, y: 3, z: -6 })
            expect(Hex({ z: 3 })).to.contain({ x: 3, y: -6, z: 3 })
        })
    })

    describe('without parameters', () => {
        it('sets all cube coordinates to 0', () => {
            expect(Hex()).to.contain({ x: 0, y: 0, z: 0 })
        })
    })

    describe('with a falsy value', () => {
        it('sets all cube coordinates to 0', () => {
            expect(Hex(null)).to.contain({ x: 0, y: 0, z: 0 })
            expect(Hex(undefined)).to.contain({ x: 0, y: 0, z: 0 })
            expect(Hex('')).to.contain({ x: 0, y: 0, z: 0 })
        })
    })
})
