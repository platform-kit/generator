export default [
  {
    path: "/tag/:id/",
    component: () => import(/* webpackChunkName: "page--src--templates--tag-vue" */ "/Users/jameshuntercarter/htdocs/generator/src/templates/Tag.vue")
  },
  {
    path: "/content/:slug/",
    component: () => import(/* webpackChunkName: "page--src--templates--content-item-vue" */ "/Users/jameshuntercarter/htdocs/generator/src/templates/ContentItem.vue")
  },
  {
    path: "/buy/:slug/",
    component: () => import(/* webpackChunkName: "page--src--templates--offering-vue" */ "/Users/jameshuntercarter/htdocs/generator/src/templates/Offering.vue")
  },
  {
    path: "/terms/",
    component: () => import(/* webpackChunkName: "page--src--pages--terms-vue" */ "/Users/jameshuntercarter/htdocs/generator/src/pages/Terms.vue")
  },
  {
    path: "/services/",
    component: () => import(/* webpackChunkName: "page--src--pages--services-vue" */ "/Users/jameshuntercarter/htdocs/generator/src/pages/Services.vue")
  },
  {
    path: "/recent/",
    component: () => import(/* webpackChunkName: "page--src--pages--recent-vue" */ "/Users/jameshuntercarter/htdocs/generator/src/pages/Recent.vue")
  },
  {
    path: "/products/",
    component: () => import(/* webpackChunkName: "page--src--pages--products-vue" */ "/Users/jameshuntercarter/htdocs/generator/src/pages/Products.vue")
  },
  {
    path: "/content/",
    component: () => import(/* webpackChunkName: "page--src--pages--content-vue" */ "/Users/jameshuntercarter/htdocs/generator/src/pages/Content.vue")
  },
  {
    name: "404",
    path: "/404/",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/jameshuntercarter/htdocs/generator/node_modules/gridsome/app/pages/404.vue")
  },
  {
    path: "/:slug/",
    component: () => import(/* webpackChunkName: "page--src--templates--landing-page-vue" */ "/Users/jameshuntercarter/htdocs/generator/src/templates/LandingPage.vue")
  },
  {
    name: "home",
    path: "/",
    component: () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/jameshuntercarter/htdocs/generator/src/pages/Index.vue")
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/jameshuntercarter/htdocs/generator/node_modules/gridsome/app/pages/404.vue")
  }
]

