# Engine

> A standalone analytics backend for platforms.

> [!CODE]
[github: platform-kit/engine](https://github.com/platform-kit/engine)


## Features

<!-- tabs:start -->

#### ** Developers **
- [x] Analytics API
- [x] 1-step install/deploy

<!-- tabs:end -->

## Tech Stack

- [x] [Heroku](http://heroku.com/) / [Dokku](http://dokku.com/) for deployment
- [x] [PostgreSQL](https://www.postgresql.org/) for database

## Installation

<!-- tabs:start -->

#### ** Local **

**1. Configure database, app key, & .env**

Clone this repository and run the following commands:

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
npm install 
npm run dev
```

**2. Run Server**

```bash
php artisan serve
```

#### ** Cloud **

### Via Heroku Deploy Button

Click this button to deploy to Heroku instantly.

<a style="padding-top:10px;" href="https://www.heroku.com/deploy/?template=https://github.com/platform-kit/engine"><img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy"></a>

### Via Heroku Command Line Interface

If you prefer to deploy from the command line, do the following:

**1. Create a Heroku app**

Create an app name

```bash
app_name=heroku-laravel57-test-app
```

Create Heroku app

```bash
heroku apps:create $app_name
heroku addons:create heroku-postgresql:hobby-dev --app $app_name
heroku addons:create heroku-redis:hobby-dev --app $app_name
heroku buildpacks:add heroku/php --app $app_name
heroku buildpacks:add heroku/nodejs --app $app_name
```

**2. Add Heroku git remote**

```bash
heroku git:remote --app $app_name
```

**3. Set config parameters**

For Laravel to operate correctly you need to set `APP_KEY`:

```bash
heroku config:set --app $app_name APP_KEY=$(php artisan --no-ansi key:generate --show)
```

Set Queues, sessions and cache to use redis

```bash
heroku config:set --app $app_name QUEUE_CONNECTION=redis SESSION_DRIVER=redis CACHE_DRIVER=redis
```

Optionally set your app's environment to development

```bash
heroku config:set --app $app_name APP_ENV=development APP_DEBUG=true APP_LOG_LEVEL=debug
```

**4. Deploy to Heroku**

```bash
 git push heroku master
```

**5. Run migrations**

```bash
heroku run -a $app_name php artisan postdeploy:heroku
```
<!-- tabs:end -->

Licensed under the [MIT license](http://opensource.org/licenses/MIT).

Documentation, content, training & more at https://www.platformkit.com 

Made with 💖 + ⚡ by [DharmaWorks](https://www.dharmaworks.com)