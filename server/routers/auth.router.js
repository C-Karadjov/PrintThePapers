const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controllers = require('../controllers/auth.controller')(data);
    
    router
        .get('/login', controllers.getLoginPage)
        .post('/login', controllers.login)
        .get('/logout', controllers.logout)
        .get('/register', controllers.getRegisterPage)
        .post('/register', controllers.register)
        .get('/profile/:username', controllers.getProfilePage);
    app.use('/', router);
};

module.exports = { attachTo };
