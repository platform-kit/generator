// Import main css
// import '~/assets/style/index.scss'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { IconsPlugin } from 'bootstrap-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faShoppingCart, faCartPlus, faCalendar } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'
import marked from 'marked'
import themeSettings from '../data/theme.json'
import { Auth0Plugin, authGuard } from "@marketredesign/auth0-spa-vue"

config.autoAddCss = false;
library.add(faGithub, faTwitter)
library.add(faShoppingCart, faCartPlus, faCalendar)

// Import default layout so we don't need to import it to every page
import DefaultLayout from '~/layouts/Default.vue'

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function (Vue, { router, head, isClient }) {

  if(themeSettings != null && themeSettings.global_css != null) {
    head.style.push({
      type: 'text/css',
      cssText: themeSettings.global_css
    })
  }
  if(themeSettings != null && themeSettings.global_head != null) {
    head.script.push({
      innerHTML: themeSettings.global_head
    });
  }
  
  Vue.use(BootstrapVue)

  Vue.use(IconsPlugin)  

  Vue.use(Auth0Plugin, {
    domain: process.env.GRIDSOME_AUTH0_DOMAIN,
    clientId: process.env.GRIDSOME_AUTH0_CLIENT_ID,
    onRedirectCallback: appState => {
      router.push(
        appState && appState.targetUrl
          ? appState.targetUrl
          : '/'
      );
    }
  })

  Vue.component('font-awesome', FontAwesomeIcon)

  Vue.filter('markdown', (string) => marked(string))

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
    
}