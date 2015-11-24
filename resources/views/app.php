<!DOCTYPE html>
<html ng-app="bbc-recipes">
    <head>
        <title>BBC Recipes</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <base href="/" />
        <link rel="stylesheet" href="/css/app.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
    </head>
    <body>
        <header class="header">
            <div class="container--main">
                <a class="logo" href="/">
                    <img src="/images/logo.svg">
                    <span>Recipes</span>
                </a>
            </div>
        </header>
        <div class="container--main" ui-view></div>
        <script type="text/javascript" src="/js/index.js"></script>
    </body>
</html>
