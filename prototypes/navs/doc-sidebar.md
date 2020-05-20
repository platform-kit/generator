---
title: Docs Sidebar
id: doc-sidebar
slug: docs-sidebar
---
- <a href="/docs" class="opacity-30 text-dark-blue bg-none"><i class="fa fa-fw opacity-0 mr-2"></i>Docs</a>
- <g-link to="/docs/features"><i class="fa fa-fw fa-check-square mr-2"></i>Features</g-link>
- <g-link to="/docs/architecture"><i class="fa fa-fw fa-cogs mr-2"></i>Architecture</g-link>
- <g-link to="/docs/generator"><i class="fa fa-fw fa-laptop mr-2"></i>Site Generator</g-link>    
    - <g-link to="/docs/installation" v-bind:class="{ visible: $route.path.includes('/docs/') && ($route.path.includes('generator') || $route.path.includes('development') || $route.path.includes('models')) }" >Installation</g-link>
    - <g-link to="/docs/development" v-bind:class="{ visible: $route.path.includes('/docs/') && ($route.path.includes('generator') || $route.path.includes('installation')) || $route.path.includes('models') }" >Development</g-link>
    - <g-link to="/docs/models" v-bind:class="{ visible: $route.path.includes('/docs/') && ($route.path.includes('generator') || $route.path.includes('installation')) || $route.path.includes('development') }" >Data Models</g-link>
- <g-link to="/docs/serverless-api"><i class="fa fa-fw fa-server mr-2"></i>API Endpoints</g-link>
    - <g-link  v-bind:class="{ visible: $route.path.includes('/docs/') && $route.path.includes('api') }" to="/docs/auth-api">Authentication</g-link>
    - <g-link  v-bind:class="{ visible: $route.path.includes('/docs/') && $route.path.includes('api') }" to="/docs/analytics-api">Analytics</g-link>
    - <g-link  v-bind:class="{ visible: $route.path.includes('/docs/') && $route.path.includes('api') }" to="/docs/content-api">Content</g-link>  
    - <g-link  v-bind:class="{ visible: $route.path.includes('/docs/') && $route.path.includes('api') }" to="/docs/checkout-api">Checkout</g-link> 
    - <g-link  v-bind:class="{ visible: $route.path.includes('/docs/') && $route.path.includes('api') }" to="/docs/webhooks-api">WebHooks</g-link>   
- <g-link to="/docs/changelog"><i class="fa fa-fw fa-book mr-2"></i>Changelog</g-link>
