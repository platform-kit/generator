# <i class="fas fa-fw fa-server"></i>Serverless API

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

By default PlatformKit's is configured for development and deployment via [Netlify Functions.](https://www.netlify.com/products/functions/)

To test your site locally with a live API, simply run 
```bash
netlify dev
```

To deploy, simply push your changes to the git repo attached to your Netlify site.

Deploying to other cloud providers is possible via the [Serverless Framework.](https://serverless.com/framework/docs/providers/aws/guide/functions/)