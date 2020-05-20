---
title: Installation
id: installation
published: true
featured: true
slug: installation
---

# [Source Code](#source-code)

<i class="fa fa-fw fa-code opacity-50 mr-2  text-primary"> </i> [github.com/platform-kit/generator](https://github.com/platform-kit/generator)

<hr>

# [Cloud Install](#cloud-install)

Click the button below to deploy to Netlify instantly.

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/platform-kit/generator" style="margin-left:-5px;padding:10px 5px 15px 5px;"><img  src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

Build Command: `npm run generate`

Publish Directory: `dist`

# [Local Install](#local-install)

To install via the command line, enter the target folder and run these commands:

```bash
### install platformkit and dev tools

npm install platformkit
npm install netlify-cli -g
npm install --global @gridsome/cli

### initialize the app

./bin/run seedData
netlify dev
npx netlify-cms-proxy-server
```

Site is available at http://localhost:8888

CMS is available  at http://localhost:8888/admin-local

Happy coding 🎉🙌