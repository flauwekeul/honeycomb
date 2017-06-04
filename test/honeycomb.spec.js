import { expect } from 'chai'

import { ORIENTATIONS } from '../src/hex/constants'
import * as API from '../src/honeycomb'

describe('API', function() {
    it('exposes HEX_ORIENTATIONS', function() {
        expect(API).to.have.property('HEX_ORIENTATIONS').that.eqls(ORIENTATIONS)
    })

    it('exposes Grid', function() {
        expect(API).to.have.property('Grid').that.is.a('function').with.property('name', 'Grid')
    })

    it('exposes Point', function() {
        expect(API).to.have.property('Point').that.is.a('function').with.property('name', 'Point')
    })
})
