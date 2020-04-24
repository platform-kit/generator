<div align="center" style="background:#fff;border-radius:5px;padding:10px 10px 5px 10px;margin-top:20px;">
    <h1 style="margin-bottom:15px;margin-top:10px; border:none;font-weight:100;color:#000 !important;"><span>platformkit</span> <span style="">generator</span></h1>
</div>

> A static site generator for building content, software, and e-commerce platforms.

> [!CODE]
[github: platform-kit/generator](https://github.com/platform-kit/generator)

## Features

<!-- tabs:start -->

## ** Business **
- [x] Build landing pages
- [x] Manage & publish content
- [x] Sell products & services
- [x] Sell subscriptions
- [x] Create a marketing plan
- [x] Schedule social media

## ** Developers **
- [x] Local development environment
- [x] 1-click deployment
- [x] Analytics API
- [x] Content API from Markdown
- [x] Extensible templates
- [x] Auto-generate docs

## ** Users **
- [x] Supports Apple Pay & Google Pay
- [x] Beautiful and simple design
- [x] Lightning-fast search
- [x] No tracking cookies
- [x] Even works offline

<!-- tabs:end -->

## Tech Stack
- Data Layer
    - [x] [Markdown](https://www.markdownguide.org/getting-started/) & [JSON](https://www.json.org/json-en.html) for flat data storage
    - [x] [Sequelize](https://sequelize.org/) for database queries
    - [x] [GraphQL](https://www.graphql.com/) for internal API
- Business Layer
    - [x] [JWT](https://jwt.io/) for authentication
    - [x] [Node](https://nodejs.org/) for package development
    - [x] [OCLIF](https://oclif.io/) for command line interface
    - [x] [Serverless Functions](https://serverless-stack.com/chapters/what-is-serverless.html) for external APIs
- Presentation Layer (optional)
    - [x] [Vue](https://vuejs.org/) for UI state management
    - [x] [Gridsome](https://gridsome.org/) for static site generation
    - [x] [Bootstrap-Vue](https://bootstrap-vue.js.org/) for UI components

## Use Cases

Since the architecture takes into consideration the separation of concerns, this allows for a number of use cases.

- Using all 3 layers
    - Deploy a full static site & API using the default template.
    - Deploy a full static site & API using a custom template.
    - Deploy a full static site & API using a completely separate site builder.
- Using just the Business Layer
    - Deploy just an API.
    - Deploy infrastructure using build scripts.
    - Deploy just a library/package for use in other apps.
- Using just the Data Layer
    - Don't deploy anything, just use the CMS locally to manage content.

## Installation

<!-- tabs:start -->

#### ** Cloud **

Click the button below to deploy to Netlify instantly.

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/platform-kit/generator"><img style="margin-top:5px;" src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

**Option 1** 

If you want to generate the content/e-commerce portion of the site - 

Build Command: `npm run generate`

Publish Directory: `dist`

**Option 2**

If you only want to generate the docs -

Build Command: `./bin/run getData; ./bin/run copyData;`

Publish Directory: `dist/docs`

#### ** Local **

To install via the command line, enter the target folder and run these commands:

1. Install PlatformKit Generator: `git clone https://github.com/platform-kit/generator project-name` where `project-name` is the name of your project.
2. Install dependencies: `yarn install`
3. Install starter content: `./bin/run seedData`
4. Install Gridsome CLI: `npm install --global @gridsome/cli`
5. Start the local DEV server at`gridsome develop`
6. Start local CMS server `npx netlify-cms-proxy-server` 
7. Site is available at `http://localhost:8080` and CMS at `http://localhost:8080/admin-local`
8. Happy coding 🎉🙌

<!-- tabs:end -->

For more detailed instructions, check out the [Development Guide](/guides/development.md)

Licensed under the [MIT license](http://opensource.org/licenses/MIT)

Documentation, content, training & more at https://www.platformkit.com 

Made with 💖 + ⚡ by [DharmaWorks](https://www.dharmaworks.com)