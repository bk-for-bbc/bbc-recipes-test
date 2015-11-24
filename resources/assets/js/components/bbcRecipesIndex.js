const app = require('../app');

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
