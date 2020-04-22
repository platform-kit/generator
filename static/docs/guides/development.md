PlatformKit is designed to allow the content and the site generator to be developed separately. 

However you can also develop them together as a single project. 

Below are the instructions for each.

## Developing the generator

1. Install PlatformKit Generator: `git clone https://github.com/your-username/generator project-name` where `your-username` is the username where you've forked `platform-kit/generator` and `project-name` is the name of the folder you'd like to work in.
2. Install dependencies: `yarn install`
3. Install starter content: `./bin/run seedData`
4. Start the local DEV server at`gridsome develop` at `http://localhost:8080`
5. Start local CMS server `npx netlify-cms-proxy-server`
6. Push the changes from the root directory of your project when you're done.

## Developing content

1. Install PlatformKit Generator: `git clone https://github.com/platform-kit/generator project-name` where `project-name` is the name of your project.
2. Add a `REPOSITORY` value the `.env` file in your root directory to reference your Github repo.
3. Run `yarn install` to install dependencies.
4. Load your content from its Git repo: `./bin/run getData` into the `/workspace` directory.
5. Start the local DEV server at`gridsome develop` at `http://localhost:8080`
6. Change directory to the content repo workspace: `cd workspace repository`
7. Start local CMS server `npx netlify-cms-proxy-server`
8. Open `http://localhost:8080/admin-local` and create content.
9. Push your content from the workspace to the data folder: `./bin/run copyData`
10. Push the changes from `/workspace/repository` when you're done.

## Developing a monorepo

1. Install PlatformKit Generator: `git clone https://github.com/your-username/generator project-name` where `your-username` is the username where you've forked `platform-kit/generator` and `project-name` is the name of the folder you'd like to work in.
2. Delete the line from the .gitignore file which references `data` directory
3. Run `yarn install` to install dependencies.
4. Start the local DEV server at`gridsome develop` at `http://localhost:8080`
5. Start local CMS server `npx netlify-cms-proxy-server`
6. Open `http://localhost:8080/admin-local` and create content.
7. Push the changes from the root directory of your project when you're done.