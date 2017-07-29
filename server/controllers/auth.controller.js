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
        getProfilePage(req, res) {
            const username = req.params.username;
            return data.users.findBy({ username: username })
                .then((userData) => {
                    if (!userData) {
                        return res.render('page-not-found', { user: req.user });
                    }
                    return res.render('users/profile', {
                        user: req.user,
                        userData: userData,
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500)
                        .json('An error occurred! Please try again!');
                });
        },
        createAdmin(req, res) {
            if (!req.isAuthenticated() || req.user.role !== 'admin') {
                res.render('not-authorized-page', { user: req.user });
            }
            const targetUser = {
                username: req.params.username,
            };

            const newData = { $set: { role: 'admin' } };
            return data.users.updateUser(targetUser, newData)
                .then(() => {
                     res.redirect('/home');
                })
                .catch((err) => {
                    console.log(err);
                    res.render('not-authorized-page', { user: req.user });
                });
        },
    };
};

module.exports = getController;
