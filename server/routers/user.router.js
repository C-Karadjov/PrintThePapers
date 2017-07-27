const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controllers = require('../controllers/user.controller')(data);

    router
        .get('/profile', controllers.getMyProfile)
        .get('/profile/:username', controllers.getProfilePage)
        .get('/admin-panel', controllers.getAdminPage)
        .get('/admin-panel/:id', controllers.getUserById)
        .post('/profile/:username/update-status', controllers.createAdmin)
        .post('/profile/:username/delete-user', controllers.deleteUser);
    app.use('/', router);
};

module.exports = { attachTo };
