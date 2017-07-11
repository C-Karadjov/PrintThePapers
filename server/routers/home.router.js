const { Router } = require('express');

const attach = (app, data) => {
    const router = new Router();
    const controllers = require('../controllers/home.controller')(data);
    router
        .get('/home', (controllers.getHomePage));

    app.use('/', router);
};

module.exports = attach;
