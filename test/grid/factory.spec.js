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
                sinon.spy(Hex.prototype, 'origin')
            })
            after(() => {
                Hex.prototype.size.restore()
                Hex.prototype.orientation.restore()
                Hex.prototype.origin.restore()
            })

            it('returns a grid containing the passed hex options', () => {
                const grid = Grid({ hex: { size: 10, orientation: 'flat', origin: [-2, 7] } })
                expect(grid).to.have.property('hex').that.eqls({
                    size: Hex.prototype.size(),
                    orientation: Hex.prototype.orientation(),
                    origin: Hex.prototype.origin()
                })
            })

            it('sets Hex.prototype.size', () => {
                Grid({ hex: { size: 5 } })
                expect(Hex.prototype.size).to.have.been.calledWith(5)
            })

            it('sets Hex.prototype.orientation', () => {
                Grid({ hex: { orientation: 'pointy' } })
                expect(Hex.prototype.orientation).to.have.been.calledWith('pointy')
            })

            it('sets Hex.prototype.origin', () => {
                Grid({ hex: { origin: [-1, 0] } })
                expect(Hex.prototype.origin).to.have.been.calledWith([-1, 0])
            })
        })
    })
})
