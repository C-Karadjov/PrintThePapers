const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controllers = require('../controllers/home.controller')(data);
    router
        .get('/', (controllers.getHomePage))
        .get('/home', (controllers.getHomePage));

    app.use('/', router);
};

module.exports = { attachTo };
