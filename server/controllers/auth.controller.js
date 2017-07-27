const passport = require('passport');

const getController = (data) => {
    return {
        getLoginPage(req, res) {
            res.render('users/login');
        },
        getRegisterPage(req, res) {
            res.render('users/register');
        },
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
                    next(error);
                    return res.status(500)
                        .json('Server error! Please try again!');
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
                    return res.status(200).json('Login successful!');
                });
            })(req, res, next);
        },
    };
};

module.exports = getController;
