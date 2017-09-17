'use strict'

/**
 * Remove the `_links` property.
 * @param {Object} original
 * @param {Object} flattened
 * @returns {Object}
 */
module.exports = function removeLinks (original, flattened) {
  if (!original) {
    return flattened
  }
  if (typeof original._links !== 'undefined') {
    delete flattened._links
  }
  return flattened
}
