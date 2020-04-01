# PlatformKit Generator

> A static site generator for building content, software, and e-commerce **platforms**.

## Business Features
- [x] Build landing pages.
- [x] Manage & publish content.
- [x] Sell products & services.
- [x] Sell subscriptions.
- [x] Schedule social media posts.
- [x] Maintain beautiful documentation.
- [x] A/B test everything.

## Developer Features
- [x] Highly customizable.
- [x] Integrated analytics.
- [x] Integrated marketing automations.
- [x] Local development environment.
- [x] 1-step install/deploy.

## End-User Features
- [x] Beautiful and simple design.
- [x] Lightning-fast search.
- [x] Even works offline.

## Tech Stack
- [x] **Markdown** for data storage
- [x] **GraphQL** for APIs
- [x] **Vue** for markup
- [x] **Gridsome** for code generation
- [x] **Bootstrap** for UI


## Benefits

No coding necessary.

If you want to write custom code, you only need one language: Javascript.

No technical debt or lock-in, unlike traditional monolithic solutions.

Since the data is [static files](https://daringfireball.net/projects/markdown/), you can easily change the entire architecture in the future.


## Demo URL

<a href="https://www.dharmaworks.com" target="_blank">https://www.dharmaworks.com</a>


## Cloud Installation

Click the button below to deploy to Netlify instantly.

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/platform-kit/generator"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

Use these settings:

Build Command: `gridsome build`

Publish Directory: `dist`

## Local Installation

To install via the command line,

1. Create a folder: `mkdir my-platformkit-site` 
2. Enter it: `cd my-platformkitsite`
3. Install PlatformKit Generator: `yarn add platform-kit/generator`
4. Install starter content: `./bin/run seedData`
5. Start the local DEV server at`gridsome develop` at `http://localhost:8080`
6. Start local CMS server `npx netlify-cms-proxy-server` at `http://localhost:8081` 
7. Happy coding 🎉🙌

Documentation, content, training & more at https://www.platformkit.com 

Made with 💖 + ⚡ by [DharmaWorks](https://www.dharmaworks.com)