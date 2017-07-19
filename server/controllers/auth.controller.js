const passport = require('passport');

const getController = (data) => {
    return {
        logout(req, res) {
            req.logout();
            res.redirect('/home');
        },
        register(req, res) {
            return data.users.userCreate(req.body.firstName, req.body.lastName,
                req.body.username, req.body.password,
                req.body.email, req.body.profilePicture)
                .then(() => {
                    passport.authenticate('local')(req, res, () => {
                        res.redirect('/home');
                    });
                })
                .catch((err) => {
                    res.status(400).send(err);
                    res.redirect('/register');
                });
        },
        login(req, res, next) {
            passport.authenticate('local', (error, user) => {
                if (error) {
                    return next(error);
                }

                if (!user) {
                    return res.status(400)
                        .json('Invalid username or password!');
                }

                return req.login(user, (err) => {
                    if (err) {
                        next(err);
                        return res.status(500)
                            .json('Server error! Please try again!');
                    }
                    return res.redirect('/home');
                });
            })(req, res, next);
        },
    };
};

module.exports = getController;
