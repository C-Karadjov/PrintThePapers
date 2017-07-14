const { Router } = require('express');
const passport = require('passport');

const attachTo = (app, data) => {
    const router = new Router();

    router
        .get('/login', (req, res) => {
            res.render('users/login');
        })
        .post('/login', (req, res) => {

        })
        .get('/logout', (req, res) => {
            req.logout();
            res.redirect('/home');
        })
        .get('/register', (req, res) => {
            res.render('users/register');
        })
        .post('/register', (req, res) => {
            data.userCreate(req.body.username, req.body.password);
        });
    app.use('/', router);
};

module.exports = { attachTo };
