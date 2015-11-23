const angular = require('angular');
const app = angular.module('bbc-recipes', [require('angular-ui-router')]);

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

app.component('bbcRecipesIndex', {
    controller: function($http) {
        $http.get('/api/recipes').success((data) => {
            this.recipes = data;
            console.log('Index', this.recipes);
        });
    },
    template: `
    <div ng-if="bbcRecipesIndex.recipes !== undefined">
        <h2>Browse</h2>
        <div class="warning--empty" ng-if="!bbcRecipesIndex.recipes.length">
            Sorry, we currently have no recipes for you
        </div>
        <div class="recipes--list">
            <div class="recipe" ng-repeat="recipe in bbcRecipesIndex.recipes">
                <a class="recipe--link" ng-href="/recipes/{{ recipe.slug }}">
                    <img class="recipe--image" ng-src="{{ recipe.image }}">
                    <div class="recipe--body">
                        <h3>{{ recipe.name }}</h3>
                        <p class="recipe--time"><i class="fa fa-clock-o"></i> {{ recipe.cooking_time }} minutes</p>
                        <div>
                            <span class="recipe--ingredient" ng-repeat="ingredient in recipe.ingredients">{{ ingredient.name }}</span>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>`
});

app.component('bbcRecipePage', {
    bindings: {
        slug: '@'
    },
    controller($http) {
        $http.get('/api/recipes/' + this.slug).success((data) => {
            this.found = true;
            this.recipe = data;
        }).error(function() {
            this.found = false;
        });
    },
    template: `
    <div ng-if="bbcRecipePage.found === true">
        {{ bbcRecipePage.recipe }}
    </div>
    <div class="warning--empty" ng-if="bbcRecipePage.found === false">
        Sorry, this recipe doesn't exist or may have been removed
    </div>`
});
