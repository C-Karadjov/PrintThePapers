const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Strategy } = require('passport-local');

const configPassport = (app, data) => {
    passport.use(new Strategy(
        (username, password, done) => {
            return users.findUserByCredentials(username)
                .then((user) => {
                    if (user.password !== password) {
                        done(new Error('Invalid password!'));
                    }
                    return done(null, user);
                })
                .catch((err) => {
                    return done(err);
                });
        }
    ));

    app.use(cookieParser());
    app.use(session({
        secret: 'express-18',
        resave: true,
        saveUninitialized: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        return users.findById(id)
            .then((user) => {
                done(null, user);
            })
            .catch(done);
    });
};

module.exports = { configPassport };
