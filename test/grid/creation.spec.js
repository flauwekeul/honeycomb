import { expect } from 'chai'
import sinon from 'sinon'

import Hex from '../../src/hex'
import Grid from '../../src/grid'

describe('Grid Creation', () => {
    describe('with an object containing hex options', () => {
        before(() => {
            sinon.spy(Hex, 'size')
            sinon.spy(Hex, 'orientation')
            sinon.spy(Hex, 'origin')
        })
        after(() => {
            Hex.size.restore()
            Hex.orientation.restore()
            Hex.origin.restore()
        })

        it('sets Hex.size', () => {
            Grid({ hex: { size: 5 } })
            expect(Hex.size).to.have.been.calledWith(5)
        })

        it('sets Hex.orientation', () => {
            Grid({ hex: { orientation: 'pointy' } })
            expect(Hex.orientation).to.have.been.calledWith('pointy')
        })

        it('sets Hex.origin', () => {
            Grid({ hex: { origin: [-1, 0] } })
            expect(Hex.origin).to.have.been.calledWith([-1, 0])
        })
    })
})
