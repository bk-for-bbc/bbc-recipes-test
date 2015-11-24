exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['./tests/frontend/**/*.js'],
    baseUrl: 'http://localhost:8000'
};
