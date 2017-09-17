const postJson = require('./fixtures/post')
const modify = require('../src')

describe('wp-api-response-modifier', () => {
  it('throws with bad response', () => {
    expect(() => modify(1, [])).toThrowError(/expecting response to be/i)
    expect(() => modify(null, [])).toThrowError(/expecting response to be/i)
    expect(() => modify("", [])).toThrowError(/expecting response to be/i)
  })

  it('throws if effects is not function or array', () => {
    expect(() => modify(postJson, 1)).toThrowError(/expecting effects to be/i)
  })

  it('throws if an effect is not a function', () => {
    expect(() => modify(postJson, [() => {}, 1])).toThrowError(/effect is not a function/i)
  })

  it('does not throw if effects not given', () => {
    expect(() => modify(postJson)).not.toThrow()
  })

  it('accepts effects fn', () => {
    const hasRendered = ['guid', 'title', 'content', 'excerpt']
    const result = modify(postJson, [modify.effects.flattenRenderedProps])
    const flattenedCount = hasRendered.reduce((i, k) => {
      return typeof result[k] === 'string' ? i + 1 : i
    }, 0)

    // Check given effect was applied
    expect(flattenedCount).toEqual(hasRendered.length)
    // Check `_links` is still here, which means override of effects was successful
    expect(typeof result._links).toEqual('object')
  })

  it('accepts effects array', () => {
    const result = modify(postJson, [
      modify.effects.removeLinks,
      modify.effects.camelize
    ])

    expect(typeof result._links).toEqual('undefined')
    expect(result.featuredMedia).toBeTruthy()
  })
})
