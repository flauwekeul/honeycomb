import { expect } from 'chai'
import Point from '../../src/point'

describe('Point prototype', () => {
    describe('add', () => {
        it('adds the coordinates of the given point to itself', () => {
            const result = Point(1, -3).add(Point(2, 4))
            expect(result).to.contain({ x: 3, y: 1 })
        })
    })

    describe('subtract', () => {
        it('subtracts the coordinates of given point from itself', () => {
            const result = Point(1, -3).subtract(Point(2, 4))
            expect(result).to.contain({ x: -1, y: -7 })
        })
    })
})
