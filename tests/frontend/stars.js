describe('stars', function() {
    it('should initially be empty', function() {
        browser.get('/starred');
        expect(element(by.css('.warning--empty')).getText()).toBe('Sorry, you don\'t currently have any starred recipes, get started by starring recipes you like');
    });

    it('should allow a user to star a recipe', function() {
        browser.get('/starred');
        var initialStarredCount = element.all(by.css('bbc-recipe-card')).count();
        browser.get('/');

        var recipe = element.all(by.css('bbc-recipe-card')).first();
        recipe.click();

        var btn = element(by.css('.recipe--star-row a'));
        btn.click();
        expect(btn.getText()).toBe('Starred');

        browser.get('/starred');
        var newStarredCount = element.all(by.css('bbc-recipe-card')).count();
        expect(newStarredCount).toBeGreaterThan(initialStarredCount);
    });


    it('should allow a user to unstar a recipe', function() {
        browser.get('/starred');
        var initialStarredCount = element.all(by.css('bbc-recipe-card')).count();
        browser.get('/');

        var recipe = element.all(by.css('bbc-recipe-card')).first();
        recipe.click();

        var btn = element(by.css('.recipe--star-row a'));
        btn.click();
        expect(btn.getText()).toBe('Star this Recipe');

        browser.get('/starred');
        var newStarredCount = element.all(by.css('bbc-recipe-card')).count();
        expect(newStarredCount).toBeLessThan(initialStarredCount);
    });
});
