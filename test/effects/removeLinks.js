const merge = require('lodash.merge')

const postJson = require('../fixtures/post')
const effect = require('../../src/effects/removeLinks')

describe('removeLinks', () => {
  it('transforms', () => {
    const result = effect(postJson, merge({}, postJson))
    expect(typeof result._links).toBe('undefined')
  })
})
