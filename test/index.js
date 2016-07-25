const test = require('tape')

const postJson = require('./fixtures/post')
const modify = require('../src/index')

function testEffects () {
  require('./effects/flattenRenderedProps')
  require('./effects/liftEmbeddedAuthor')
  require('./effects/liftEmbeddedFeaturedMedia')
  require('./effects/removeLinks')
  require('./effects/camelize')
}

test('throws if effects is not function or array', (t) => {
  try {
    modify(postJson, 1)
  } catch (err) {
    t.equal(err.message, 'Expecting effects to be an array or function, got number.')
    t.end()
  }
})

test('throws if an effect is not a function', (t) => {
  try {
    modify(postJson, [() => {}, 1])
  } catch (err) {
    t.equal(err.message, 'Effect at index 1 is not a function, got number.')
    t.end()
  }
})

test('does not throw if effects not given', (t) => {
  modify(postJson)
  t.end()
})

test('accepts effects fn', (t) => {
  const hasRendered = ['guid', 'title', 'content', 'excerpt']
  const result = modify(postJson, modify.effects.flattenRenderedProps)

  const flattenedCount = hasRendered
    .reduce((i, k) => typeof result[k] === 'string' ? i + 1 : i, 0)

  // Check given effect was applied
  t.equal(flattenedCount, hasRendered.length)
  // Check `_links` is still here, which means override of effects was successful
  t.equal(typeof result._links, 'object')

  t.end()
})

test('accepts effects array', (t) => {
  const result = modify(postJson, [
    modify.effects.removeLinks,
    modify.effects.camelize
  ])

  t.equal(typeof result._links, 'undefined')
  t.equal(Boolean(result.featuredMedia), true)
  t.end()
})

testEffects()
