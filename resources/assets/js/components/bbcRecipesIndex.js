const app = require('../app');

app.component('bbcRecipesIndex', {
    controller($http, $stateParams, $state) {
        this.jumpPage = function(pageOffset) {
            let newPage = this.page + pageOffset;
            if (newPage < 1) {
                newPage = 1;
            }
            $state.go('.', {page: newPage});
        };

        this.page = parseInt($stateParams.page, 10);
        this.perPage = 10;

        this.searchQuery = null;

        this.search = (item) => {
            if (!this.searchQuery) {
                return true; // If search query is empty, show all
            }

            let searchTerm = this.searchQuery.toLowerCase();

            let parsed = parseInt(this.searchQuery);
            if (Number.isInteger(parsed)) {
                return item.cooking_time <= parsed; // If the search term begins with a number ('25' or '25 minutes'), search by maximum cooking time
            }

            let ingredientSearch = item.ingredients.filter((obj) => {
                return obj.name.toLowerCase().indexOf(searchTerm) != -1; // Filter through the nested ingredients object by name
            })[0];

            if (ingredientSearch) {
                return true;
            }

            if ((item.name.toLowerCase().indexOf(searchTerm) != -1)) {
               return true; // Finally, filter by name of the recipe
            }

            return false;
        };

        $http.get('/api/recipes').success((data) => {
            this.recipes = data;
        });
    },
    template: `
    <ul class="nav nav-tabs">
        <li role="presentation" class="active"><a href="/">Browse</a></li>
        <li role="presentation">
            <div class="search--hold">
                <i class="fa fa-search"></i>
                <input class="search--input" ng-model="bbcRecipesIndex.searchQuery" placeholder="Search">
            </div>
        </li>
    </ul>
    <div ng-if="bbcRecipesIndex.recipes !== undefined">
        <div class="warning--empty" ng-if="!(bbcRecipesIndex.recipes | filter:bbcRecipesIndex.search).length">
            Sorry, we currently have no recipes for you
        </div>
        <div class="recipes--list block-grid-xs-1 block-grid-sm-3 block-grid-md-4">
            <div class="recipe" ng-repeat="recipe in bbcRecipesIndex.recipes | filter:bbcRecipesIndex.search | fromPage:bbcRecipesIndex.page:bbcRecipesIndex.perPage">
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
        <div ng-if="(bbcRecipesIndex.recipes | filter:bbcRecipesIndex.search).length > bbcRecipesIndex.perPage">
            <ul class="pager">
                <li ng-class="{disabled: bbcRecipesIndex.page === 1}"><a ng-click="bbcRecipesIndex.jumpPage(-1);">Previous</a></li>
                <li ng-class="{disabled: (bbcRecipesIndex.perPage * bbcRecipesIndex.page) >= bbcRecipesIndex.recipes.length}"><a ng-click="bbcRecipesIndex.jumpPage(1);">Next</a></li>
            </ul>
        </div>
    </div>`
});
