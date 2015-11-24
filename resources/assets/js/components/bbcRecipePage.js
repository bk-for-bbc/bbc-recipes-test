const app = require('../app');

app.component('bbcRecipePage', {
    bindings: {
        slug: '@'
    },
    controller($http, $filter) {
        this.toggleStar = () => {
            this.isStarred = !this.isStarred;
            if (this.isStarred === true) {
                $http.post('/api/me/starred/' + this.recipe.id);
            } else {
                $http.delete('/api/me/starred/' + this.recipe.id);
            }
        };

        $http.get('/api/me/starred').success((data) => {
            this.isStarred = $filter('filter')(data, {slug: this.slug}).length ? true : false;
        });

        $http.get('/api/recipes/' + this.slug).success((data) => {
            this.found = true;
            this.recipe = data;
        }).error(() => {
            this.found = false;
        });
    },
    template: `
    <div class="backlinks">
        <a href="/" class="backlink"><i class="fa fa-chevron-left"></i>Back to Recipes</a>
    </div>
    <div ng-if="bbcRecipePage.found === true">
        <div class="row">
            <div class="col-sm-6 col-md-4">
                <img ng-src="{{ bbcRecipePage.recipe.image }}">
                <div class="recipe--star-row" ng-class="{'recipe--star-row-active': bbcRecipePage.isStarred}">
                    <a ng-click="bbcRecipePage.toggleStar()">
                        <span ng-if="bbcRecipePage.isStarred">
                            <i class="fa fa-star"></i>Starred
                        </span>
                        <span ng-if="!bbcRecipePage.isStarred">
                            <i class="fa fa-star-o"></i>Star this Recipe
                        </span>
                    </a>
                </div>
            </div>
            <div class="col-sm-6 col-md-8">
                <h3>{{ bbcRecipePage.recipe.name }}</h3>
                <p class="recipe--time"><i class="fa fa-clock-o"></i> {{ bbcRecipePage.recipe.cooking_time }} minutes</p>
                <div class="recipe--ingredients-table">
                    <table class="table">
                        <thead>
                            <th>Qty.</th>
                            <th>Ingredient</th>
                        </thead>
                        <tbody>
                            <tr ng-repeat="ingredient in bbcRecipePage.recipe.ingredients">
                                <td class="recipe--ingredients-table-qty">{{ ingredient.quantity }}</td>
                                <td>{{ ingredient.name }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="warning--empty" ng-if="bbcRecipePage.found === false">
        Sorry, this recipe doesn't exist or may have been removed
    </div>`
});
