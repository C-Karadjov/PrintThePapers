const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controllers = require('../controllers/products.controller')(data);

    router
        .get('/products', controllers.getAllProducts);

    app.use('/', router);
};

module.exports = { attachTo };
