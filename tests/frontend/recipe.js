describe('recipe page', function() {
    it('should show the recipe', function() {
        browser.get('/recipes/lemon-chicken');
        var heading = element(by.css('h3'));
        expect(heading.isPresent()).toBe(true);
        expect(heading.getText()).toBe('Lemon Chicken');
    });

    it('should show image', function() {
        var image = element(by.css('.recipe--image'));
        expect(image.isPresent()).toBe(true);
        expect(image.getAttribute('src')).toContain('/images/recipes/lemon_chicken.png');
    });

    it('should show cooking time', function() {
        var time = element(by.css('.recipe--time'));
        expect(time.isPresent()).toBe(true);
        expect(time.getText()).toBe('30 minutes');
    });

    it('should show ingredients', function() {
        var rows = element.all(by.css('.recipe--ingredients-table tr'));
        expect(rows.count()).toBeGreaterThan(0);
    });
});
