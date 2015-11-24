describe('index page', function() {
    it('should show Browse and Starred options', function() {
        browser.get('/');

        var tabs = element.all(by.css('.nav-tabs li'));
        expect(tabs.count()).toEqual(2);
    });

    it('should show recipes', function() {
        var recipes = element.all(by.css('bbc-recipe-card'));
        expect(recipes.count()).toBeGreaterThan(0);
    });

    it('should allow recipe navigation', function() {
        var recipe = element.all(by.css('bbc-recipe-card')).first();
        recipe.click();
        expect(browser.getCurrentUrl()).toContain('/recipes/');
    });

    var input = element(by.css('.search--input'));

    it('should show no results for bad query', function() {
        browser.get('/');

        input.clear().sendKeys('Lasagne');
        expect(element(by.css('.warning--empty')).getText()).toBe('Sorry, we currently have no recipes for you');
    });

    it('should filter results by recipe name', function() {
        input.clear().sendKeys('Chicken');

        var recipes = element.all(by.css('bbc-recipe-card'));
        expect(recipes.count()).toBeGreaterThan(0);
        expect(recipes.first().element(by.css('h3')).getText()).toContain('Chicken');
    });

    it('should filter results by ingredient name', function() {
        input.clear().sendKeys('Lettuce');

        var recipes = element.all(by.css('bbc-recipe-card'));
        expect(recipes.count()).toBeGreaterThan(0);
        expect(recipes.first().element(by.css('.recipe--ingredients-list')).getText()).toContain('Lettuce');
    });


    it('should filter results by cooking time', function() {
        input.clear().sendKeys('25 minutes');

        var recipes = element.all(by.css('bbc-recipe-card'));
        expect(recipes.count()).toBeGreaterThan(0);
        expect(recipes.first().element(by.css('.recipe--time')).getText()).toBe('25 minutes');
    });
});
