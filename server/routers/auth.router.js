const { Router } = require('express');
const passport = require('passport');

const attachTo = (app, data) => {
    const router = new Router();
    
    router
        .get('/login', (req, res) => {
            res.render('users/login');
        })
        .post('/login', passport.authenticate('local',
            {
                successRedirect: '/home',
                failureRedirect: '/login',
                failureFlash: true,
            }),
        )
        .get('/logout', (req, res) => {
            req.logout();
            res.redirect('/home');
        })
        .get('/register', (req, res) => {
            res.render('users/register');
        })
        .post('/register', (req, res) => {
            return data.users.userCreate(req.body.firstName, req.body.lastName,
                req.body.username, req.body.password, req.body.profilePicture)
                .then(() => {
                    res.redirect('/home');
                });
        });
    app.use('/', router);
};

module.exports = { attachTo };
