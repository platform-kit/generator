# Installation

> [!CODE]
[github: platform-kit/generator](https://github.com/platform-kit/generator)

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

Publish Directory: `static/docs`

#### ** Local **

To install via the command line, enter the target folder and run these commands:

```bash
git clone https://github.com/platform-kit/generator project-name # where project-name is the name of your project
yarn install
./bin/run seedData
npm install --global @gridsome/cli
gridsome develop
npx netlify-cms-proxy-server
```

Site is available at `http://localhost:8080` and CMS at `http://localhost:8080/admin-local`
Happy coding 🎉🙌

<!-- tabs:end -->