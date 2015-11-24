const app = require('../app');

app.component('bbcRecipeCard', {
    bindings: {
        item: '='
    },
    template: `
        <div class="recipe">
            <a class="recipe--link" ng-href="/recipes/{{ bbcRecipeCard.item.slug }}">
                <img class="recipe--image" ng-src="{{ bbcRecipeCard.item.image }}">
                <div class="recipe--body">
                    <h3>{{ bbcRecipeCard.item.name }}</h3>
                    <p class="recipe--time"><i class="fa fa-clock-o"></i> {{ bbcRecipeCard.item.cooking_time }} minutes</p>
                    <div>
                        <span class="recipe--ingredient" ng-repeat="ingredient in bbcRecipeCard.item.ingredients">{{ ingredient.name }}</span>
                    </div>
                </div>
            </a>
        </div>`
});
