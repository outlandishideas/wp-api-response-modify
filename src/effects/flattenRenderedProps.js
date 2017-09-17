'use strict'

/**
 * Flatten any object that has a single property `rendered`.
 * @param {Object} original
 * @param {Object} flattened
 * @returns {Object}
 */
module.exports = function flattenRenderedProps (original, flattened) {
  if (!original) {
    return flattened
  }

  for (const key in original) {
    if (
      typeof original[key] === 'object'
      && Object.keys(original[key]).length === 1
      && typeof original[key].rendered === 'string'
    ) {
      flattened[key] = original[key].rendered
    }
  }

  return flattened
}
