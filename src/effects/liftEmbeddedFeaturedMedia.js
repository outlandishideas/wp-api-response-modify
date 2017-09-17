'use strict'

const find = require('lodash.find')

const fmKey = 'wp:featuredmedia'

/**
 * Replace the `featured_media` field with the value of the embedded `wp:featuredmedia`.
 * @param {Object} original
 * @param {Object} flattened
 * @returns {Object}
 */
module.exports = function liftEmbeddedFeaturedMedia (original, flattened) {
  if (!original) {
    return flattened
  }

  const hasFeaturedMedia = original.featured_media
  const hasEmbeddedFeaturedMedia = original._embedded && original._embedded[fmKey]

  if (hasEmbeddedFeaturedMedia && hasFeaturedMedia) {
    flattened.featured_media = find(flattened._embedded[fmKey], (media) => {
      return media.id === original.featured_media
    })
  }

  return flattened
}
