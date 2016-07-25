'use strict'

/**
 * Flatten any object that has a single property `rendered`.
 * @param {Object} original
 * @param {Object} flattened
 * @returns {Object}
 */
module.exports = function flattenRenderedProps (original, flattened) {
  Object.keys(original).forEach(function (key) {
    if (
      original[key] &&
      Object.keys(original[key]).length === 1 &&
      original[key].rendered
    ) {
      flattened[key] = original[key].rendered
    }
  })

  return flattened
}
