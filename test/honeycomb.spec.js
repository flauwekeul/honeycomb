import { expect } from 'chai'

import * as API from '../src/honeycomb'
import { ORIENTATIONS } from '../src/hex/constants'
import extendHex from '../src/hex'
import Point from '../src/point'

describe('API', function() {
    it('exposes a Hex namespace', function() {
        expect(API).to.have.property('Hex').that.eqls({ ORIENTATIONS, createFactory: extendHex })
    })

    it('exposes a Grid namespace', function() {
        expect(API).to.have.property('Grid')
            .that.is.an('object')
            .with.property('createFactory')
            .that.is.a('function')
            .with.property('name', 'createFactory')
    })

    it('exposes the Point factory', function() {
        expect(API).to.have.property('Point').that.eqls(Point)
    })
})
