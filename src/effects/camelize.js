'use strict'

import { camelizeKeys } from 'humps'

/**
 * Transform all property names to camel-case.
 * @param {Object} original
 * @param {Object} flattened
 * @returns {Object}
 */
module.exports = function camelize (original, flattened) {
  return camelizeKeys(flattened)
}
