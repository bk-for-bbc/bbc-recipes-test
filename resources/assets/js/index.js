const angular = require('angular');

angular.module('bbc-recipes', [require('angular-ui-router')])
    .component('helloWorld', {
        template: `Hello... it's me.`
    });
