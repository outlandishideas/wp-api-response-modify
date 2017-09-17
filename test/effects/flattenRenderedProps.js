const merge = require('lodash.merge')

const postJson = require('../fixtures/post')
const effect = require('../../src/effects/flattenRenderedProps')

describe('flattenRenderedProps', () => {
  it('transforms', () => {
    const hasRendered = ['guid', 'title', 'content', 'excerpt']
    const result = effect(postJson, merge({}, postJson))
    const flattenedCount = hasRendered.reduce((i, k) => {
      return typeof result[k] === 'string' ? i + 1 : i
    }, 0)
    expect(flattenedCount).toBe(hasRendered.length)
  })
})
