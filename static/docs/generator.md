<div align="center" style="background:#fff;border-radius:5px;padding:10px 10px 5px 10px;margin-top:20px;">
    <h1 style="margin-bottom:15px;margin-top:10px; border:none;font-weight:100;color:#000 !important;"><span>platformkit</span> <span style="">generator</span></h1>
</div>

> A static site generator for building content, software, and e-commerce platforms.

[github: platform-kit/generator](https://github.com/platform-kit/generator)

## Business Features
- [x] Generate business ideas.
- [x] Create a marketing plan.
- [x] Build landing pages.
- [x] Manage & publish content.
- [x] Sell products & services.
- [x] Sell subscriptions.
- [x] Schedule social media posts.
- [x] Help desk & documentation.
- [x] A/B test everything.

## Developer Features
- [x] 1-step install/deploy.
- [x] Local development environment.
- [x] Integrated analytics & marketing automation.
- [x] Edit or add custom template components easily.

## End-User Features
- [x] Beautiful and simple design.
- [x] Lightning-fast search.
- [x] Even works offline.

## Tech Stack
- [x] **Markdown** for data storage
- [x] **GraphQL** for APIs
- [x] **Gridsome** for static site generation
- [x] **Vue** for markup
- [x] **Bootstrap** for UI
- [x] **OCLIF** for CLI


## Cloud Installation

Click the button below to deploy to Netlify instantly.

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/platform-kit/generator"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

**Option 1** 

If you want to generate the content/e-commerce portion of the site - 

Build Command: `./bin/run getData; ./bin/run copyData; gridsome build`

Publish Directory: `dist`

**Option 2**

If you only want to generate the docs -

Build Command: `./bin/run getData; ./bin/run copyData; gridsome build`

Publish Directory: `dist/docs`

## Local Installation

To install via the command line, enter the target folder and run these commands:

1. Install PlatformKit Generator: `git clone https://github.com/platform-kit/generator project-name` where `project-name` is the name of your project.
2. Install dependencies: `yarn install`
3. Install starter content: `./bin/run seedData`
4. Install Gridsome CLI: `npm install --global @gridsome/cli`
5. Start the local DEV server at`gridsome develop`
6. Start local CMS server `npx netlify-cms-proxy-server` 
7. Site is available at `http://localhost:8080` and CMS at `http://localhost:8080/admin-local`
8. Happy coding 🎉🙌

# Development Guide

For more detailed instructions, check out the [Development Guide](/guides/development.md)

# License

Licensed under the [MIT license](http://opensource.org/licenses/MIT)

# Resources

Documentation, content, training & more at https://www.platformkit.com 

Made with 💖 + ⚡ by [DharmaWorks](https://www.dharmaworks.com)