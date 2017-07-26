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
        .get('/profile', controllers.getMyProfile)
        .get('/profile/:username', controllers.getProfilePage)
        .get('/admin-panel', controllers.getAdminPage)
        .get('/admin-panel/:id', controllers.getUserById)
        .post('/profile/:username/update-status', controllers.createAdmin);
    app.use('/', router);
};

module.exports = { attachTo };
