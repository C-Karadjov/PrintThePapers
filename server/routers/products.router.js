const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controllers = require('../controllers/products.controller')(data);

    router
        .get('/vizitki', controllers.getAllProducts)
        .get('/vizitki/sub1', controllers.getAllProducts);

    app.use('/products', router);
};

module.exports = { attachTo };
