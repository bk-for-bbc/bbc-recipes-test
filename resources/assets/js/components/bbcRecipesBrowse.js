const app = require('../app');

app.component('bbcRecipesBrowse', {
    bindings: {
        starred: '='
    },
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
    <div class="search">
        <div class="search--hold">
            <i class="fa fa-search"></i>
            <input class="search--input" ng-model="bbcRecipesBrowse.searchQuery" placeholder="Search">
        </div>
    </div>
    <div ng-if="bbcRecipesBrowse.recipes !== undefined">
        <div class="warning--empty" ng-if="!(bbcRecipesBrowse.recipes | filter:bbcRecipesBrowse.search).length">
            Sorry, we currently have no recipes for you
        </div>
        <div class="recipes--list block-grid-xs-1 block-grid-sm-3 block-grid-md-4">
            <bbc-recipe-card item="recipe" ng-repeat="recipe in bbcRecipesBrowse.recipes | filter:bbcRecipesBrowse.search | fromPage:bbcRecipesBrowse.page:bbcRecipesBrowse.perPage"></bbc-recipe-card>
        </div>
        <div ng-if="(bbcRecipesBrowse.recipes | filter:bbcRecipesBrowse.search).length > bbcRecipesBrowse.perPage">
            <ul class="pager">
                <li ng-class="{disabled: bbcRecipesBrowse.page === 1}"><a ng-click="bbcRecipesBrowse.jumpPage(-1);">Previous</a></li>
                <li ng-class="{disabled: (bbcRecipesBrowse.perPage * bbcRecipesBrowse.page) >= bbcRecipesBrowse.recipes.length}"><a ng-click="bbcRecipesBrowse.jumpPage(1);">Next</a></li>
            </ul>
        </div>
    </div>`
});
