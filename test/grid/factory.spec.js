import { expect } from 'chai'
import sinon from 'sinon'

import Hex from '../../src/hex'
import Grid from '../../src/grid'

describe('Grid factory', () => {
    describe('creation', () => {
        describe('with an object containing hex options', () => {
            before(() => {
                sinon.spy(Hex.prototype, 'size')
                sinon.spy(Hex.prototype, 'orientation')
            })
            after(() => {
                Hex.prototype.size.restore()
                Hex.prototype.orientation.restore()
            })

            it('returns a grid where with the passed hex options', () => {
                const grid = Grid({ hex: { size: 10, orientation: 'flat' } })
                expect(grid).to.have.property('hex').that.eqls({ size: 10, orientation: 'flat' })
            })

            it('calls Hex.prototype.size', () => {
                Grid({ hex: { size: 5 } })
                expect(Hex.prototype.size).to.have.been.calledWith(5)
            })

            it('calls Hex.prototype.orientation', () => {
                Grid({ hex: { orientation: 'pointy' } })
                expect(Hex.prototype.orientation).to.have.been.calledWith('pointy')
            })
        })
    })
})
