const { Router } = require('express');
const passport = require('passport');

const attachTo = (app, data) => {
    const router = new Router();
    const controllers = require('../controllers/auth.controller')(data);
    
    router
        .get('/login', (req, res) => {
            res.render('users/login');
        })
        .post('/login', controllers.login)
        .get('/logout', controllers.logout)
        .get('/register', (req, res) => {
            res.render('users/register');
        })
        .post('/register', controllers.register);
    app.use('/', router);
};

module.exports = { attachTo };
