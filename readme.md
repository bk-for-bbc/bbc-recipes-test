## Introduction

Hi, my name is Ben King, and this is my BBC Recipes test app. The app uses a PHP API-first backend with the Laravel framework and a local SQLite database for portability. The frontend is a JavaScript Single-Page-App using AngularJS.

## Installation

To install the app, run the following commands from the top directory:

`npm install`

`gulp`

`composer install`

`touch database/database.sqlite`

If you do not have Composer installed, installation instructions can be found [here](https://getcomposer.org/doc/00-intro.md). If you run into further issues installing the app, the [Laravel Installation page](http://laravel.com/docs/5.1/installation) should be able to help.

## Serving the Application

To serve the app run `php artisan serve`

## Migration & Seeding

To migrate the database, run `php artisan migrate`

To populate the database with sample data, run `php artisan db:seed`

If you wish to populate multiple records of the sample data, run this command as many times as you like.

To reset the application to a seeded state (for instance before running frontend tests) run `php artisan migrate:refresh --seed`

## Testing

### Backend

To test the PHP backend, run `phpunit`

### Frontend

To test the Angular frontend, first run `webdriver-manager start` to start a Selenium process. Then also run `protractor`

If you run into issues, try first running `webdriver-manager upgrade`

## Code Location

If you are unfamiliar with the layout of the Laravel framework, my work can be found in the following places:

`app/*.php`

`app/Http/routes.php`

`database/migrations/*.php`

`database/seeds/*.php`

`resources/assets/**/*`

`resources/views/app.php`

`tests/**/*`

The Angular app is located in `resources/assets/js`. Components can be found in the `components` folder, while `index.js` sets up all non-component elements such as filters and routes.

## Notes

I wanted the frontend to be a Single-Page-App so that the user experience would be smooth, particularly with filtering and managing a user's stars. However this approach has downsides, such as a lack of SEO which would be important for a recipes site. With more time, I would move the app to being isomorphic; the client-side app rendered on the server and progressively enhanced in the browser once the frontend scripts have loaded.

To build the frontend of the app I decided to go with a component-focused design, leveraging the new component helper in Angular 1.5. For the backend I decided to build an API-first application with the Laravel framework, as it enabled me to get up and running quickly with models and relational data (such as for ingredients / user stars). In the interest of time I did not set up a full login system; instead the application presumes the current user to be User #1.
