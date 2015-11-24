const app = require('../app');

app.component('bbcRecipesIndex', {
    template: `
        <ul class="nav nav-tabs">
            <li role="presentation" ui-sref-active="active"><a ui-sref="index.browse"><i class="fa fa-book"></i>Browse</a></li>
            <li role="presentation" ui-sref-active="active"><a ui-sref="index.starred"><i class="fa fa-star"></i>Starred</a></li>
        </ul>
        <div ui-view></div>`
});
