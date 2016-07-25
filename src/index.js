'use strict'

var merge = require('lodash.merge')

var effectsHash = {
  removeLinks: require('./effects/removeLinks'),
  flattenRenderedProps: require('./effects/flattenRenderedProps'),
  liftEmbeddedAuthor: require('./effects/liftEmbeddedAuthor'),
  liftEmbeddedFeaturedMedia: require('./effects/liftEmbeddedFeaturedMedia'),
  // Perform last so effects always handle raw property names
  camelize: require('./effects/camelize')
}

var allEffects = Object.keys(effectsHash).reduce(function (allEffects, key) {
  allEffects.push(effectsHash[key])
  return allEffects
}, [])

/**
 * Make a WP API response JSON sensible.
 * @param {Object} response Reponse JSON
 * @param {Array|Function} [effects] Effect or effects to apply to the response, default all effects
 * @returns {Object} Modified response JSON
 */
module.exports = function modify (response, effects) {
  if (typeof effects !== 'function' && !(effects instanceof Array)) {
    throw new Error('Expecting effects to be an array or function, got ' + typeof effects + '.')
  }

  effects = effects
    ? !(effects instanceof Array) ? [effects] : effects
    : allEffects

  effects.forEach(function (effect, i) {
    if (typeof effect !== 'function') {
      throw new Error('Effect at index ' + i + ' is not a function, got ' + typeof effect + '.')
    }
  })

  if (response instanceof Array) {
    return response.map(modify)
  }

  return effects.reduce(function (flattened, effect) {
    return effect(response, flattened)
  }, merge({}, response))
}

module.exports.effects = effectsHash
