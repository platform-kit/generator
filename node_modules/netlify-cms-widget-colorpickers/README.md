# netlify-cms-widget-colorpickers

A Collection of Color Pickers from Sketch, Photoshop, Chrome, Github, Twitter, Material Design & more widget for Netlify CMS.

[![npm version](https://badge.fury.io/js/netlify-cms-widget-colorpickers.svg)](https://badge.fury.io/js/netlify-cms-widget-colorpickers)
[![GitHub version](https://badge.fury.io/gh/sekmet%2Fnetlify-cms-widget-colorpickers.svg)](https://badge.fury.io/gh/sekmet%2Fnetlify-cms-widget-colorpickers)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)


## Install

As an npm package:

```shell
yarn add netlify-cms-widget-colorpickers

OR

npm install --save netlify-cms-widget-colorpickers
```

```js
import NetlifyCmsWidgetColorpickers from 'netlify-cms-widget-colorpickers';

CMS.registerWidget([
  NetlifyCmsWidgetColorpickers.Widget()
])
```

## How to use

Add to your Netlify CMS configuration:

```yaml
    fields:
      - { name: <fieldname>, label: <fieldlabel>, widget: colorpickers }
```



## Support

For help with this widget, open an [issue](https://github.com/sekmet/netlify-cms-widget-color) or ask the Netlify CMS community in [Gitter](https://gitter.im/netlify/netlifycms).
