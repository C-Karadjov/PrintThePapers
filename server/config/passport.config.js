const passport = require('passport');
const { Strategy } = require('passport-local');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(expressSession);

const configPassport = (app, data, db) => {
    passport.use(new Strategy(
        (username, password, done) => {
            data.users.findBy({ username: username })
                .then((user) => {
                    if (!user) {
                        return done(null,
                            false,
                            { message: 'Incorrect username.' });
                    }
                    return done(null, user);
                });
        }
    ));
    app.use(expressSession({
        store: new MongoStore({ db }),
        secret: 'express-18',
        resave: true,
        saveUninitialized: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(cookieParser());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        data.users.findById(id)
            .then((user) => {
                done(null, user);
            })
            .catch(done);
    });
};

module.exports = { configPassport };
