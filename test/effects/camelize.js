const merge = require('lodash.merge')

const postJson = require('../fixtures/post')
const effect = require('../../src/effects/camelize')

describe('camelize', () => {
  it('transforms', () => {
    const result = effect(postJson, merge({}, postJson))
    expect(result.featuredMedia).toBeTruthy()
    expect(result.links).toBeTruthy()
  })
})
