const test = require('tape')
const merge = require('lodash.merge')

const postJson = require('../fixtures/post')
const effect = require('../../src/effects/camelize')

test('camelize', (t) => {
  const result = effect(postJson, merge({}, postJson))

  t.equal(Boolean(result.featuredMedia), true)
  t.equal(Boolean(result.links), true)

  t.end()
})
