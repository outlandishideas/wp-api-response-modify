const merge = require('lodash.merge')

const postJson = require('../fixtures/post')
const effect = require('../../src/effects/liftEmbeddedFeaturedMedia')

describe('liftEmbeddedFeaturedMedia', () => {
  test('transforms', () => {
    const result = effect(postJson, merge({}, postJson))
    expect(result.featured_media.id).toBe(15)
  })
})
