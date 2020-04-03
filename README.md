# PlatformKit Generator

> A static site generator for building content, software, and e-commerce **platforms**.

## Business Features
- [x] Build landing pages.
- [x] Manage & publish content.
- [x] Sell products & services.
- [x] Sell subscriptions.
- [x] Schedule social media posts.
- [x] Help & documentation.
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

## Demo

PlatformKit is powering both of these sites:

<a href="https://www.platformkit.com" target="_blank">https://www.platformkit.com</a>

<a href="https://www.dharmaworks.com" target="_blank">https://www.dharmaworks.com</a>

## Latest Build Status
![Netlify Status](https://api.netlify.com/api/v1/badges/899741a9-07d9-47c8-b9c3-eaa0f624b96b/deploy-status)

## Cloud Installation

Click the button below to deploy to Netlify instantly.

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/platform-kit/generator"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

### If you want to generate the content/e-commerce portion of the site

Build Command: `./bin/run getData; ./bin/run copyData; gridsome build`

Publish Directory: `dist`

### If you only want to generate the docs

Build Command: `./bin/run getData; ./bin/run copyData; gridsome build`

Publish Directory: `dist/docs`

## Local Installation

To install via the command line, enter the target folder and run these commands:

1. Install PlatformKit Generator: `git clone https://github.com/platform-kit/generator project-name` where `project-name` is the name of your project.
2. Install starter content: `./bin/run seedData`
3. Install Gridsome CLI: `npm install --global @gridsome/cli`
4. Start the local DEV server at`gridsome develop` at `http://localhost:8080`
5. Start local CMS server `npx netlify-cms-proxy-server` at `http://localhost:8081` 
6. Happy coding 🎉🙌

## Development Guide

For more detailed instructions, check out the [Development Guide](/guides/development.md)

Documentation, content, training & more at https://www.platformkit.com 

Made with 💖 + ⚡ by [DharmaWorks](https://www.dharmaworks.com)