const app = require('../app');

app.component('bbcRecipesIndex', {
    controller($http, $state) {
        this.jumpPage = function(pageOffset) {
            this.page = this.page + pageOffset;
            if (this.page < 1) {
                this.page = 1;
            }
        };

        this.page = 1;
        this.perPage = 10;

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
        <div class="recipes--list block-grid-xs-1 block-grid-sm-3 block-grid-md-4">
            <div class="recipe" ng-repeat="recipe in bbcRecipesIndex.recipes | fromPage:bbcRecipesIndex.page:bbcRecipesIndex.perPage">
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
        <div ng-if="bbcRecipesIndex.recipes.length > bbcRecipesIndex.perPage">
            <ul class="pager">
                <li ng-class="{disabled: bbcRecipesIndex.page === 1}"><a ng-click="bbcRecipesIndex.jumpPage(-1);">Previous</a></li>
                <li ng-class="{disabled: (bbcRecipesIndex.perPage * bbcRecipesIndex.page) > bbcRecipesIndex.recipes.length}"><a ng-click="bbcRecipesIndex.jumpPage(1);">Next</a></li>
            </ul>
        </div>
    </div>`
});
