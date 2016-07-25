# wp-api-response-modifier

> Makes WP API response JSON sensible

Made with ❤ at [@outlandish](http://www.twitter.com/outlandish)

<a href="http://badge.fury.io/js/wp-api-response-modifier"><img alt="npm version" src="https://badge.fury.io/js/wp-api-response-modifier.svg"></a>
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Makes response JSON from the WP API sensible. By default it...

- transforms properties to camel-case,
- flattens objects with a single property `rendered`,
- lifts embedded entities (author, featured media, etc.),
- removes the `_links` property.

See the [list of effects](#effects) for more.

## Install

```sh
npm install --save wp-api-response-modifier
```

## Import

```js
// ES2015
import modify from 'wp-api-response-modifier'

// CommonJS
var modify = require('wp-api-response-modifier')
```

## Usage

### `modify(response[, effects]) : Object`

Make a WP API response sensible.

- __response__ {Object} Response from WP-API
- [__effects__] {Array|Function} _(optional)_ One or more effects to apply to the response

Returns the modified response.

## Effects

All effects are available at `modify.effects`, e.g. `modify.effects.flattenRenderedProps`.

Example: `featured_media => featuredMedia`

### `flattenRenderedProps`

Flatten any object that has a single property `rendered`.

Example:

```js
{ content: { rendered: 'content string' } }
=>
{ content: 'content string' }
```

### `liftEmbeddedAuthor`

Replace the author field with the embedded author entity.

Example:

```js
{ author: 12, _embedded: { author: { id: 12, ... } } }
=>
{ author: { id: 12, ... } }
```

### `liftEmbeddedFeaturedMedia`

Replace the `featured_media` field with the value of the embedded `wp:featuredmedia`.

### `removeLinks`

Remove the `_links` property.

### `camelize`

Transform all property names to camel-case in the response.

## Contributing

All pull requests and issues welcome!

If you're not sure how, check out Kent C. Dodds'
[great video tutorials on egghead.io](https://egghead.io/lessons/javascript-identifying-how-to-contribute-to-an-open-source-project-on-github)!

## Author & License

`wp-api-response-modifier` was created by [Outlandish](https://twitter.com/outlandish) and is released under the MIT license.
