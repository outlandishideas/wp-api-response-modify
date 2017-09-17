'use strict'

const merge = require('lodash.merge')
const values = require('lodash.values')

module.exports = modify

const effectsHash = module.exports.effects = {
  removeLinks: require('./effects/removeLinks'),
  flattenRenderedProps: require('./effects/flattenRenderedProps'),
  liftEmbeddedAuthor: require('./effects/liftEmbeddedAuthor'),
  liftEmbeddedFeaturedMedia: require('./effects/liftEmbeddedFeaturedMedia'),
  // Perform last so effects always handle raw property names
  camelize: require('./effects/camelize')
}

/**
 * Make a WP API response JSON sensible.
 * @param {Object|Array} response WP API response JSON
 * @param {Array} [effects] Effects to apply to the response, defaults to all effects
 * @returns {Object} Modified response JSON
 */
function modify (response, effects = values(effectsHash)) {
  if (!Array.isArray(effects)) {
    throw new Error(`Expecting effects to be an array, got "${typeof effects}".`)
  } else if (!response || typeof response !== 'object') {
    throw new Error(`Expecting response to be an array or object, got "${typeof response}".`)
  }

  response = Array.isArray(response)
    ? response.map((r) => modify(r, effects)) : response

  return effects.reduce((flattened, effect) => {
    if (typeof effect !== 'function') {
      throw new Error(`Effect is not a function`)
    }
    return effect(response, flattened)
  }, merge({}, response))
}
