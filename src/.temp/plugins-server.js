import plugin_gridsome_plugin_netlify_cms_5 from "/Users/jameshuntercarter/htdocs/generator-new/node_modules/gridsome-plugin-netlify-cms/gridsome.client.js"
import plugin_gridsome_plugin_netlify_cms_6 from "/Users/jameshuntercarter/htdocs/generator-new/node_modules/gridsome-plugin-netlify-cms/gridsome.client.js"

export default [
  {
    run: plugin_gridsome_plugin_netlify_cms_5,
    options: {"publicPath":"/admin-local","htmlPath":"src/admin-local/index.html","configPath":"src/admin-local/config.yml","modulePath":"src/admin-local/index.js","htmlTitle":"Content Editor","injectScript":true,"enableIdentityWidget":true,"debug":false}
  },
  {
    run: plugin_gridsome_plugin_netlify_cms_6,
    options: {"publicPath":"/admin","htmlPath":"src/admin/index.html","configPath":"src/admin/config.yml","modulePath":"src/admin/index.js","htmlTitle":"Content Editor","injectScript":true,"enableIdentityWidget":true,"debug":false}
  }
]
