# mdast-util-phrasing

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Check if a [mdast][] [node][] is [phrasing content][phrasing].

## Install

[npm][]:

```sh
npm install mdast-util-phrasing
```

## Usage

```js
var phrasing = require('mdast-util-phrasing')

phrasing({
  type: 'paragraph',
  children: [{type: 'text', value: 'Alpha'}]
}) // => false

phrasing({
  type: 'strong',
  children: [{type: 'text', value: 'Delta'}]
}) // => true
```

## API

### `phrasing(node)`

Check if the given value is a phrasing element.

###### Parameters

`node` (`*`) — Value to check, typically a [node][].

###### Returns

`boolean` — whether `node` is [phrasing content][phrasing].

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [Code of Conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT][license] © [Victor Felder][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/syntax-tree/mdast-util-phrasing.svg

[build]: https://travis-ci.org/syntax-tree/mdast-util-phrasing

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/mdast-util-phrasing.svg

[coverage]: https://codecov.io/github/syntax-tree/mdast-util-phrasing

[downloads-badge]: https://img.shields.io/npm/dm/mdast-util-phrasing.svg

[downloads]: https://www.npmjs.com/package/mdast-util-phrasing

[size-badge]: https://img.shields.io/bundlephobia/minzip/mdast-util-phrasing.svg

[size]: https://bundlephobia.com/result?p=mdast-util-phrasing

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/syntax-tree

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://draft.li

[contributing]: https://github.com/syntax-tree/.github/blob/master/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/master/support.md

[coc]: https://github.com/syntax-tree/.github/blob/master/code-of-conduct.md

[mdast]: https://github.com/syntax-tree/mdast

[node]: https://github.com/syntax-tree/mdast#nodes

[phrasing]: https://github.com/syntax-tree/mdast#phrasingcontent
