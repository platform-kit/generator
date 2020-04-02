# Development Guide

PlatformKit is designed to allow the content and the site generator to be developed separately. 

However you can also develop them together as a single project. 

Below are the instructions for each.

## Developing the generator

1. Install PlatformKit Generator: `yarn add platform-kit/generator`
2. Install starter content: `./bin/run seedData`
3. Start the local DEV server at`gridsome develop` at `http://localhost:8080`
4. Start local CMS server `npx netlify-cms-proxy-server`
5. Push the changes from the root directory of your project when you're done.

## Developing content

1. Install PlatformKit Generator: `yarn add platform-kit/generator`
2. Add a `REPOSITORY` value the `.env` file in your root directory to reference your Github repo
3. Load your content from its Git repo: `./bin/run getData` into the `/workspace` directory.
4. Start the local DEV server at`gridsome develop` at `http://localhost:8080`
5. Change directory to the content repo workspace: `cd workspace repository`
6. Start local CMS server `npx netlify-cms-proxy-server`
7. Open `http://localhost:8080/admin-local` and create content.
8. Push your content from the workspace to the data folder: `./bin/run copyData`
9. Push the changes from `/workspace/repository` when you're done.

## Developing a monorepo

1. Install PlatformKit Generator: `yarn add platform-kit/generator`
2. Delete the line from the .gitignore file which references `data` directory
3. Start the local DEV server at`gridsome develop` at `http://localhost:8080`
4. Start local CMS server `npx netlify-cms-proxy-server`
5. Open `http://localhost:8080/admin-local` and create content.
6. Push the changes from the root directory of your project when you're done.