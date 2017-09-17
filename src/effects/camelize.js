'use strict'

const {camelizeKeys} = require('humps')

/**
 * Transform all property names to camel-case.
 * @param {Object} original
 * @param {Object} flattened
 * @returns {Object}
 */
module.exports = function camelize (original, flattened) {
  if (!original) {
    return flattened
  }
  return camelizeKeys(flattened)
}
