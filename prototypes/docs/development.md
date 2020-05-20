---
title: Development
id: development
slug: development

---

PlatformKit is designed to allow the content and the site generator to be developed as separate repositories. 

Below are the instructions for each.

<!-- tabs:start -->

# [Generator](#generator)

```bash
git clone https://github.com/platform-kit/generator project-name  ## `project-name` is the name of your project
npm install
npm run develop
npx run cms
```

Site is available at http://localhost:8888

Push the changes from the root directory of your project when you're done.

# [Content](#content)

```bash
git clone https://github.com/platform-kit/generator project-name ## `project-name` is the name of your project
```
Add a `REPOSITORY` value the `.env` file in your root directory to reference your Github repo.

```bash
npm run develop
```

In a new terminal tab, change directory to the content repo workspace:

```bash
cd workspace repository; npx netlify-cms-proxy-server
```

CMS is available at http://localhost:8888/admin-local

Push the changes from `/workspace/repository` when you're done.