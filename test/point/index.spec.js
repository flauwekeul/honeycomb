import { expect } from 'chai'
import Point from '../../src/point'

describe('Point creation', function() {
    describe('with 2 numbers', function() {
        it('sets the coordinates', function() {
            expect(Point(3, 2)).to.contain({ x: 3, y: 2 })
            expect(Point(-3, -2)).to.contain({ x: -3, y: -2 })
            expect(Point(3.375, 2.950)).to.contain({ x: 3.375, y: 2.950 })
        })
    })

    describe('with 1 number', function() {
        it('assumes the number is the x coordinate and sets y to the same value', function() {
            expect(Point(3)).to.contain({ x: 3, y: 3 })
        })
    })

    describe('with an object containing x and y', function() {
        it('sets the coordinates', function() {
            expect(Point({ x: 3, y: 2 })).to.contain({ x: 3, y: 2 })
        })
    })

    describe('with an object containing only x or y', function() {
        it('sets the missing coordinate to the passed coordinate', function() {
            expect(Point({ x: 3 })).to.contain({ x: 3, y: 3 })
            expect(Point({ y: 2 })).to.contain({ x: 2, y: 2 })
        })
    })

    describe('with an array containing 2 numbers', function() {
        it('sets the coordinates', function() {
            expect(Point([ 3, 2 ])).to.contain({ x: 3, y: 2 })
        })
    })

    describe('with an array containing 1 number', function() {
        it('assumes the number is the x coordinate and sets y to the same value', function() {
            expect(Point([ 3 ])).to.contain({ x: 3, y: 3 })
        })
    })

    describe('without parameters', function() {
        it('sets all coordinates to 0', function() {
            expect(Point()).to.contain({ x: 0, y: 0 })
        })
    })
})
