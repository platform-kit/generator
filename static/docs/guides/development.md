# Development Guide

PlatformKit is designed to allow the content and the site generator to be developed separately. 

However you can also develop them together as a single project. 

Below are the instructions for each.

## Developing content & theme separately

## Theme only

1. Install PlatformKit Generator: `yarn add platform-kit/generator`
2. Install starter content: `./bin/run seedData`
3. Start the local DEV server at`gridsome develop` at `http://localhost:8080`
4. Start local CMS server `npx netlify-cms-proxy-server` at `http://localhost:8081` 
5. Happy coding 🎉🙌

## Content only

1. Install PlatformKit Generator: `yarn add platform-kit/generator`
2. Add a `REPOSITORY` value the `.env` file in your root directory to reference your Github repo
3. Start the local DEV server at`gridsome develop` at `http://localhost:8080`
4. Change directory to the content repo workspace: `cd workspace repository`
5. Start local CMS server `npx netlify-cms-proxy-server` at `http://localhost:8081` 
6. Open `http://localhost:8080/admin-local`
7. Push the changes from `/workspace/repository` when you're done.

## Developing content & theme as one repository

1. Install PlatformKit Generator: `yarn add platform-kit/generator`
2. Start the local DEV server at`gridsome develop` at `http://localhost:8080`
3. Start local CMS server `npx netlify-cms-proxy-server` at `http://localhost:8081` 
4. Open `http://localhost:8080/admin-local` and create content.
5. Delete the line from the .gitignore file which references `data` directory
6. Push the changes from the root directory of your project when you're done.
