import { expect } from 'chai'

import { ORIENTATIONS } from '../src/hex/constants'
import * as API from '../src/honeycomb'

describe('API', function() {
    it('exposes the HEX_ORIENTATIONS', function() {
        expect(API).to.have.property('HEX_ORIENTATIONS').that.eqls(ORIENTATIONS)
    })

    it('exposes the Grid factory', function() {
        expect(API).to.have.property('Grid').that.is.a('function').with.property('name', 'Grid')
    })

    it('exposes the Point factory', function() {
        expect(API).to.have.property('Point').that.is.a('function').with.property('name', 'Point')
    })

    it('exposes a Views object with the DOM factory', function() {
        expect(API).to.have.property('Views').that.is.an('object')
        expect(API.Views).to.have.property('DOM').that.is.a('function').with.property('name', 'DOM')
    })
})
