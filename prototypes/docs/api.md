---
title: Serverless API
id: serverless-api
slug: serverless-api

---

# Overview

PlatformKit's API is built on Serverless Node.js functions.

You can add new API endpoints to your PlatformKit project simply by adding files to the `functions` directory.

`/functions/{your-custom-function}/{your-custom-function}.js`

```javascript
exports.handler = async ( event , context ) => {
    return {
          statusCode : 200 , body : “Hello, World!”
    };
}
```

PlatformKit is configured to work with [Netlify Functions](https://www.netlify.com/products/functions/) by default.

To test your site locally with a live API, simply run 
`
netlify dev
`

To deploy, simply push your changes to the git repo attached to your Netlify site.

Functions will be available at:<br>
 `http://localhost:8888/.netlify/functions/{your-custom-function}`

Deploying to other cloud providers is possible via the [Serverless Framework.](https://serverless.com/framework/docs/providers/aws/guide/functions/)

<br>
<hr>
<br>

# Pre-Installed Endpoints

- [Auth API](/docs/auth-api)
- [Analytics API](/docs/analytics-api)
- [Checkout API](/docs/checkout-api)
- [Content API](/docs/content-api)
- [Webhooks API](/docs/webhooks-api)