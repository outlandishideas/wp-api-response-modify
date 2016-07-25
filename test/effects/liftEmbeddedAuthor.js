const test = require('tape')
const merge = require('lodash.merge')

const postJson = require('../fixtures/post')
const effect = require('../../src/effects/liftEmbeddedAuthor')

test('lift embedded author', (t) => {
  const result = effect(postJson, merge({}, postJson))

  t.equal(result.author.id, 42)
  t.end()
})
