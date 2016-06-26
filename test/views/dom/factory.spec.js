import { expect } from 'chai'
import sinon from 'sinon'

import Hex from '../../../src/hex'
import DOM from '../../../src/views/dom'

describe('Views.DOM factory', () => {
    describe('creation', () => {
        describe('with an object containing options', () => {
            before(() => sinon.spy(Hex.prototype, 'element'))
            after(() => Hex.prototype.element.restore())

            it('returns a DOM view with the passed options', () => {
                const view = DOM({
                    container: 'container',
                    origin: [6, 3],
                    hex: { element: '<div></div>' }
                })
                expect(view).to.have.property('container').that.eqls('container')
                expect(view).to.have.property('origin').that.contains({ x: 6, y: 3 })
                expect(view).to.have.property('hex').that.eqls({ element: '<div></div>' })
            })

            it('sets Hex.prototype.element', () => {
                expect(Hex.prototype.element).to.have.been.calledWith('<div></div>')
            })
        })
    })
})
