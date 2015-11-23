<!DOCTYPE html>
<html ng-app="bbc-recipes">
    <head>
        <title>BBC Recipes</title>
        <link rel="stylesheet" href="/css/app.css"></link>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    </head>
    <body>
        <header class="header">
            <div class="container--main">
                <a class="logo" href="/" target="_self">
                    <img src="/images/logo.svg">
                    <span>Recipes</span>
                </a>
            </div>
        </header>
        <div class="container--main">
            <bbc-recipes-index></bbc-recipes-index>
        </div>
        <script type="text/javascript" src="/js/index.js"></script>
    </body>
</html>
