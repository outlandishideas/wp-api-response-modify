'use strict'

var find = require('lodash.find')

/**
 * Replace the author field with the embedded author entity.
 * @param {Object} original
 * @param {Object} flattened
 * @returns {Object}
 */
module.exports = function liftEmbeddedAuthor (original, flattened) {
  if (original.author && typeof original._embedded !== 'undefined') {
    var author = find(original._embedded.author, function (author) {
      return author.id === original.author
    })

    if (author) {
      flattened.author = author
    }
  }

  return flattened
}
