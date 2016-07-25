'use strict'

var find = require('lodash.find')

var fmKey = 'wp:featuredmedia'

/**
 * Replace the `featured_media` field with the value of the embedded `wp:featuredmedia`.
 * @param {Object} original
 * @param {Object} flattened
 * @returns {Object}
 */
module.exports = function liftEmbeddedFeaturedMedia (original, flattened) {
  var hasFeaturedMedia = original.featured_media
  var hasEmbeddedFeaturedMedia = original._embedded && original._embedded[fmKey]

  if (hasEmbeddedFeaturedMedia && hasFeaturedMedia) {
    flattened.featured_media = find(flattened._embedded[fmKey], function (media) {
      return media.id === original.featured_media
    })
  }

  return flattened
}
