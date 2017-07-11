const { Router } = require('express');
const passport = require('passport');

const attach = (app, data) => {
    const router = new Router();

    router
        .get('/login', (req, res) => {
            res.render('users/login');
        })
        .post('/login', passport.authenticate('local', {
                successRedirect: '/home',
                failureRedirect: '/login',
                failureFlash: true,
            })
        )
        .get('/logout', (req, res) => {
            req.logout();
            res.redirect('/home');
        })
        .get('/register', (req, res) => {
            res.render('users/register');
        })
        .post('/register', (req, res) => {
            const user = req.body;
            return data.user.create(user)
                .then((dbUser) => {
                    return res.redirect('./home');
                });
        });
    app.use('/', router);
};

module.exports = attach;
