# netlify-cms-color-field

[Check out a demo!](https://netlify-cms-color-field.netlify.com/demo)

Input field that only accepts hex colors. 
Shows you a preview of the entered color in author and preview mode.

## Install

As an npm package:

```shell
npm i netlify-cms-color-field
```

```js
import { Control, Preview } from 'netlify-cms-color-field'

CMS.registerWidget('colorField', Control, Preview)
```

Via `script` tag:

```html
<script src="https://unpkg.com/netlify-cms-color-field@^1.0.0"></script>

<script>
  CMS.registerWidget('colorField', Control, Preview)
</script>
```

## How to use

Add to your Netlify CMS configuration:

```yaml
    fields:
      - { name: <fieldname>, label: <fieldlabel>, widget: colorField }
```

## Support

For help with this widget, open an [issue](https://github.com/CarterMcAlister/netlify-cms-color-field) or ask the Netlify CMS community in [Gitter](https://gitter.im/netlify/netlifycms).
