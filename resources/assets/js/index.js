const bulk = require('bulk-require');
const angular = require('angular');
const app = require('./app');

app.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('index', {
            url: "/?page",
            abstract: true,
            params: {
                page: {
                    value: '1',
                    squash: true
                }
            },
            template: `<bbc-recipes-index></bbc-recipes-index>`
        })
        .state('index.browse', {
            url: '',
            template: `<bbc-recipes-browse starred="false"></bbc-recipes-browse>`
        })
        .state('index.starred', {
            url: 'starred',
            template: `<bbc-recipes-browse starred="true"></bbc-recipes-browse>`
        })
        .state('recipe', {
            url: "/recipes/:slug",
            controller($scope, $stateParams) {
                $scope.slug = $stateParams.slug;
            },
            template: `<bbc-recipe-page slug="{{ slug }}"></bbc-recipe-page>`,
        })
});

app.filter('fromPage', function() {
    return function(arr, page, perPage) {
        if (!Array.isArray(arr)) {
            return false;
        }

        let start = perPage * (page - 1);
        return arr.slice(start, start + perPage);
    }
});

bulk(__dirname, ['components/**/*.js']);
