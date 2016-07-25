const test = require('tape')
const merge = require('lodash.merge')

const postJson = require('../fixtures/post')
const effect = require('../../src/effects/flattenRenderedProps')

test('flattens rendered props', (t) => {
  const hasRendered = ['guid', 'title', 'content', 'excerpt']
  const result = effect(postJson, merge({}, postJson))

  const flattenedCount = hasRendered
    .reduce((i, k) => typeof result[k] === 'string' ? i + 1 : i, 0)

  t.equal(flattenedCount, hasRendered.length)
  t.end()
})
