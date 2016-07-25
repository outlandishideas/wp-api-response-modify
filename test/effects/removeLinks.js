const test = require('tape')
const merge = require('lodash.merge')

const postJson = require('../fixtures/post')
const effect = require('../../src/effects/removeLinks')

test('remove _links', (t) => {
  const result = effect(postJson, merge({}, postJson))

  t.equal(typeof result._links, 'undefined')
  t.end()
})
