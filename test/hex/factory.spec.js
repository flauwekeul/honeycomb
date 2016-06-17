import { expect } from 'chai'
import Hex from '../../src/hex'

describe('Hex', () => {
    describe('factory', () => {
        describe('with 3 parameters of type Number', () => {
            it('assumes the parameters are cube coordinates', () => {
                expect(Hex(3, 2, -5)).to.contain({
                    q: 3,
                    r: 2,
                    s: -5
                })
            })
        })

        describe('with 2 parameters of type Number', () => {
            it('assumes the parameters are axial coordinates and converts them to cube', () => {
                expect(Hex(3, 2)).to.contain({
                    q: 3,
                    r: -5,
                    s: 2
                })
            })
        })

        describe('with 1 parameter of type Number', () => {
            it('assumes the parameter is an axial x coordinate, sets y to the same value and converts them to cube', () => {
                expect(Hex(3)).to.contain({
                    q: 3,
                    r: -6,
                    s: 3
                })
            })
        })

        describe('without parameters', () => {
            it('sets all cube coordinates to 0', () => {
                expect(Hex()).to.contain({
                    q: 0,
                    r: 0,
                    s: 0
                })
            })
        })
    })
})
