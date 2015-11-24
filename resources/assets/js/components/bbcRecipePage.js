const app = require('../app');

app.component('bbcRecipePage', {
    bindings: {
        slug: '@'
    },
    controller($http) {
        $http.get('/api/recipes/' + this.slug).success((data) => {
            this.found = true;
            this.recipe = data;
        }).error(() => {
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
