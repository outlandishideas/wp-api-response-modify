const merge = require('lodash.merge')

const postJson = require('../fixtures/post')
const effect = require('../../src/effects/liftEmbeddedAuthor')

describe('liftEmbeddedAuthor', () => {
  it('transforms', () => {
    const result = effect(postJson, merge({}, postJson))
    expect(result.author.id).toBe(42)
  })
})
