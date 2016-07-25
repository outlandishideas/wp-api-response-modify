'use strict'

var _camelize = require('camelize')

/**
 * Transform all property names to camel-case.
 * @param {Object} original
 * @param {Object} flattened
 * @returns {Object}
 */
module.exports = function camelize (original, flattened) {
  return _camelize(flattened)
}
