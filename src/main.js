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
import { Laue } from 'laue';
import Vue from 'vue'
import VuePlyr from 'vue-plyr'

config.autoAddCss = false;
library.add(faGithub, faTwitter)
library.add(faShoppingCart, faCartPlus, faCalendar)

// Import default layout so we don't need to import it to every page
import DefaultLayout from '~/layouts/Default.vue'

// The Client API can be used here. Learn more: gridsome.org/docs/client-api
export default function (Vue, { router, head, isClient }) {

  if (themeSettings != null && themeSettings.global_css != null) {
    head.style.push({
      type: 'text/css',
      cssText: themeSettings.global_css
    })
  }
  if (themeSettings != null && themeSettings.global_head != null) {
    head.script.push({
      innerHTML: themeSettings.global_head
    });
  }

  Vue.prototype.$userToken = null
  Vue.prototype.$auth = null

  Vue.use(BootstrapVue)

  Vue.use(IconsPlugin)

  Vue.use(Laue);

  // Vue Plyr - video player
  // The second argument is optional and sets the default config values for every player.
  Vue.use(VuePlyr, {
    plyr: {
      fullscreen: { enabled: true }
    },
    emit: ['ended']
  })

  Vue.component('font-awesome', FontAwesomeIcon)

  Vue.filter('markdown', (string) => marked(string))


  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

}