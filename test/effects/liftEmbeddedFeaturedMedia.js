const test = require('tape')
const merge = require('lodash.merge')

const postJson = require('../fixtures/post')
const effect = require('../../src/effects/liftEmbeddedFeaturedMedia')

test('lift embedded featured media', (t) => {
  const result = effect(postJson, merge({}, postJson))

  t.equal(result.featured_media.id, 15)
  t.end()
})
