const bulk = require('bulk-require');
const angular = require('angular');
const app = require('./app');

app.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('index', {
            url: "/",
            template: `<bbc-recipes-index></bbc-recipes-index>`
        })
        .state('recipe', {
            url: "/recipes/:slug",
            controller($scope, $stateParams) {
                $scope.slug = $stateParams.slug;
            },
            template: `<bbc-recipe-page slug="{{ slug }}"></bbc-recipe-page>`,
        })
});

bulk(__dirname, ['components/**/*.js']);
