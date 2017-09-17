'use strict'

/**
 * Replace the author field with the embedded author entity.
 * @param {Object} original
 * @param {Object} flattened
 * @returns {Object}
 */
module.exports = function liftEmbeddedAuthor (original, flattened) {
  if (!original) {
    return flattened
  }

  if (
    original.author
    && typeof original._embedded !== 'undefined'
    && Array.isArray(original._embedded.author)
  ) {
    const author = original._embedded.author.find((a) => {
      return a.id === original.author
    })
    if (author) {
      flattened.author = author
    }
  }

  return flattened
}
