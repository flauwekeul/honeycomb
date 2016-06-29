import { expect } from 'chai'
import sinon from 'sinon'
import jsdom from 'mocha-jsdom'

import Hex from '../../../src/hex'
import DOM from '../../../src/views/dom'

describe('Views.DOM factory', () => {
    describe('creation', () => {
        jsdom()
        before(() => sinon.spy(Hex.prototype, 'element'))
        after(() => Hex.prototype.element.restore())

        describe('with valid options', () => {
            const hexElement = '<div></div>'

            it('returns a DOM view with the passed options', () => {
                const container = document.createElement('div')
                const view = DOM({
                    container: container,
                    origin: [6, 3],
                    hex: { element: hexElement }
                })
                expect(view).to.have.property('container').that.eqls(container)
                expect(view).to.have.property('origin').that.contains({ x: 6, y: 3 })
                expect(view).to.have.property('hex').that.eqls({ element: hexElement })
            })

            it('sets Hex.prototype.element', () => {
                expect(Hex.prototype.element).to.have.been.calledWith(hexElement)
            })
        })

        describe('with invalid options', () => {
            describe('invalid container', () => {
                before(() => sinon.spy(console, 'warn'))
                after(() => console.warn.restore())

                it('shows a warning', () => {
                    DOM({})
                    expect(console.warn).to.have.been.calledWith('Container is not a valid dom node: undefined.')
                    DOM({ container: '<div></div>' })
                    expect(console.warn).to.have.been.calledWith('Container is not a valid dom node: <div></div>.')
                })
            })
        })
    })
})
